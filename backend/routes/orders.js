const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../model/Order');
const Product = require('../model/Product');
const Student = require('../model/Student');
const Seller = require('../model/Seller');
const { protect, seller, student } = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create an order
// @access  Private/Student
router.post(
  '/',
  protect,
  student,
  [
    body('items', 'Items are required').isArray(),
    body('items.*.product', 'Product ID is required').not().isEmpty(),
    body('items.*.quantity', 'Quantity is required').isNumeric(),
    body('paymentMethod', 'Payment method is required').not().isEmpty(),
    body('deliverySlot', 'Delivery slot is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get student
      const student = await Student.findOne({ user: req.user.id });
      if (!student) {
        return res.status(404).json({ msg: 'Student not found' });
      }

      // Validate products and calculate total
      const { items, paymentMethod, deliverySlot, isRecurring, recurringFrequency } = req.body;
      
      let totalPrice = 0;
      const orderItems = [];
      let sellerId = null;

      // Process each item
      for (let item of items) {
        const product = await Product.findById(item.product);
        
        if (!product) {
          return res.status(404).json({ msg: `Product not found: ${item.product}` });
        }
        
        if (!product.isAvailable) {
          return res.status(400).json({ msg: `Product is not available: ${product.name}` });
        }
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ 
            msg: `Not enough stock for ${product.name}. Available: ${product.stock}`
          });
        }

        // Set seller (all items must be from same seller)
        if (!sellerId) {
          sellerId = product.seller;
        } else if (sellerId.toString() !== product.seller.toString()) {
          return res.status(400).json({ 
            msg: 'All items must be from the same seller' 
          });
        }

        // Calculate price
        const price = product.discountedPrice || product.price;
        const itemTotal = price * item.quantity;
        totalPrice += itemTotal;

        // Add to order items
        orderItems.push({
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          price,
          image: product.images.length > 0 ? product.images[0] : null
        });

        // Update product stock
        product.stock -= item.quantity;
        await product.save();
      }

      // Add delivery fee
      const deliveryFee = 20; // You can make this dynamic based on distance, etc.
      totalPrice += deliveryFee;

      // Create order
      const order = new Order({
        student: student._id,
        seller: sellerId,
        items: orderItems,
        shippingAddress: {
          hostel: student.hostel,
          roomNumber: student.roomNumber
        },
        deliverySlot,
        paymentMethod,
        totalPrice,
        deliveryFee,
        isRecurring: isRecurring === true,
        recurringFrequency: recurringFrequency || 'none'
      });

      // Set next delivery date if recurring
      if (isRecurring) {
        const nextDate = new Date(deliverySlot.date);
        
        if (recurringFrequency === 'daily') {
          nextDate.setDate(nextDate.getDate() + 1);
        } else if (recurringFrequency === 'weekly') {
          nextDate.setDate(nextDate.getDate() + 7);
        } else if (recurringFrequency === 'monthly') {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }
        
        order.nextDeliveryDate = nextDate;
      }

      // If payment is successful (for online payments)
      if (paymentMethod === 'razorpay' && req.body.paymentResult) {
        order.paymentResult = {
          id: req.body.paymentResult.id,
          status: req.body.paymentResult.status,
          update_time: req.body.paymentResult.update_time,
          email_address: req.body.paymentResult.email_address
        };
        order.status = 'confirmed';
      }

      const savedOrder = await order.save();

      // Update student loyalty points
      student.shoppingPoints += Math.floor(totalPrice / 10); // 1 point for every 10 units of currency
      
      // Update loyalty level based on points
      if (student.shoppingPoints >= 1000) {
        student.loyaltyLevel = 'platinum';
      } else if (student.shoppingPoints >= 500) {
        student.loyaltyLevel = 'gold';
      } else if (student.shoppingPoints >= 200) {
        student.loyaltyLevel = 'silver';
      }
      
      await student.save();

      res.status(201).json(savedOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/orders
// @desc    Get all student orders
// @access  Private/Student
router.get('/', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const orders = await Order.find({ student: studentProfile._id })
      .sort({ createdAt: -1 })
      .populate('seller', 'storeName');

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/orders/seller
// @desc    Get all seller orders
// @access  Private/Seller
router.get('/seller', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    const orders = await Order.find({ seller: sellerProfile._id })
      .sort({ createdAt: -1 })
      .populate('student', 'collegeId hostel roomNumber');

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/orders/:id
// @desc    Get order by id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('seller', 'storeName storeAddress phone')
      .populate('student', 'collegeId hostel roomNumber');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check authorization
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user.id });
      if (order.student.toString() !== student._id.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
    } else if (req.user.role === 'seller') {
      const seller = await Seller.findOne({ user: req.user.id });
      if (order.seller.toString() !== seller._id.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private/Seller
router.put(
  '/:id/status',
  protect,
  seller,
  [
    body('status', 'Status is required').isIn([
      'pending',
      'confirmed',
      'processing',
      'out_for_delivery',
      'delivered',
      'cancelled'
    ])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      // Check authorization
      const sellerProfile = await Seller.findOne({ user: req.user.id });
      if (order.seller.toString() !== sellerProfile._id.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      // Update status
      order.status = req.body.status;
      
      // If order is cancelled, return items to inventory
      if (req.body.status === 'cancelled') {
        for (let item of order.items) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Order not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/orders/:id/cancel
// @desc    Cancel order
// @access  Private/Student
router.put('/:id/cancel', protect, student, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check authorization
    const studentProfile = await Student.findOne({ user: req.user.id });
    if (order.student.toString() !== studentProfile._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Check if order can be cancelled
    if (['delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ msg: 'Order cannot be cancelled' });
    }

    // Update status
    order.status = 'cancelled';
    
    // Return items to inventory
    for (let item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 