const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Seller = require('../model/Seller');
const Order = require('../model/Order');
const Product = require('../model/Product');
const Student = require('../model/Student');
const { protect, seller } = require('../middleware/auth');

// @route   GET api/sellers/profile
// @desc    Get seller profile
// @access  Private/Seller
router.get('/profile', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller profile not found' });
    }

    res.json(sellerProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/sellers/profile
// @desc    Update seller profile
// @access  Private/Seller
router.put(
  '/profile',
  protect,
  seller,
  [
    body('storeName', 'Store name is required').not().isEmpty(),
    body('storeAddress', 'Store address is required').not().isEmpty(),
    body('phone', 'Phone number is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Build update object
      const updateFields = {};
      if (req.body.storeName) updateFields.storeName = req.body.storeName;
      if (req.body.storeAddress) updateFields.storeAddress = req.body.storeAddress;
      if (req.body.phone) updateFields.phone = req.body.phone;
      if (req.body.openingTime) updateFields.openingTime = req.body.openingTime;
      if (req.body.closingTime) updateFields.closingTime = req.body.closingTime;

      // Update seller profile
      const sellerProfile = await Seller.findOneAndUpdate(
        { user: req.user.id },
        { $set: updateFields },
        { new: true }
      );

      if (!sellerProfile) {
        return res.status(404).json({ msg: 'Seller profile not found' });
      }

      res.json(sellerProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/sellers/dashboard
// @desc    Get seller dashboard stats
// @access  Private/Seller
router.get('/dashboard', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller profile not found' });
    }

    // Get current date and set time to the beginning of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Set time to the beginning of yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Set time to the beginning of this month
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Get all orders for seller
    const orders = await Order.find({ 
      seller: sellerProfile._id,
      status: { $ne: 'cancelled' }
    });
    
    // Get today's orders
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt) >= today
    );
    
    // Get yesterday's orders
    const yesterdayOrders = orders.filter(order => 
      new Date(order.createdAt) >= yesterday && new Date(order.createdAt) < today
    );
    
    // Get this month's orders
    const thisMonthOrders = orders.filter(order => 
      new Date(order.createdAt) >= thisMonth
    );
    
    // Calculate revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const yesterdayRevenue = yesterdayOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Get pending orders
    const pendingOrders = orders.filter(order => 
      ['pending', 'confirmed', 'processing'].includes(order.status)
    ).length;
    
    // Get delivery orders
    const deliveryOrders = orders.filter(order => 
      ['out_for_delivery'].includes(order.status)
    ).length;

    // Get products count
    const productsCount = await Product.countDocuments({ seller: sellerProfile._id });

    // Get out of stock products
    const outOfStockProducts = await Product.countDocuments({ 
      seller: sellerProfile._id,
      stock: 0
    });

    res.json({
      orders: {
        total: orders.length,
        today: todayOrders.length,
        yesterday: yesterdayOrders.length,
        thisMonth: thisMonthOrders.length,
        pending: pendingOrders,
        delivery: deliveryOrders
      },
      revenue: {
        total: totalRevenue,
        today: todayRevenue,
        yesterday: yesterdayRevenue,
        thisMonth: thisMonthRevenue
      },
      products: {
        total: productsCount,
        outOfStock: outOfStockProducts
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sellers/top-students
// @desc    Get top students by order amount
// @access  Private/Seller
router.get('/top-students', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller profile not found' });
    }

    // Get all completed orders for this seller
    const orders = await Order.find({
      seller: sellerProfile._id,
      status: 'delivered'
    }).populate('student', 'collegeId hostel roomNumber');

    // Group orders by student and calculate total spent
    const studentSpending = {};
    
    orders.forEach(order => {
      const studentId = order.student._id.toString();
      
      if (!studentSpending[studentId]) {
        studentSpending[studentId] = {
          student: order.student,
          totalSpent: 0,
          orderCount: 0
        };
      }
      
      studentSpending[studentId].totalSpent += order.totalPrice;
      studentSpending[studentId].orderCount += 1;
    });

    // Convert to array and sort by total spent
    const topStudents = Object.values(studentSpending)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10); // Get top 10

    res.json(topStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sellers/top-products
// @desc    Get top selling products
// @access  Private/Seller
router.get('/top-products', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller profile not found' });
    }

    // Get all completed orders for this seller
    const orders = await Order.find({
      seller: sellerProfile._id,
      status: 'delivered'
    });

    // Group by product and calculate total quantity sold
    const productSales = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const productId = item.product.toString();
        
        if (!productSales[productId]) {
          productSales[productId] = {
            product: productId,
            name: item.name,
            image: item.image,
            quantitySold: 0,
            revenue: 0
          };
        }
        
        productSales[productId].quantitySold += item.quantity;
        productSales[productId].revenue += item.price * item.quantity;
      });
    });

    // Convert to array and sort by quantity sold
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 10); // Get top 10

    res.json(topProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sellers/sales-statistics
// @desc    Get sales statistics by time period
// @access  Private/Seller
router.get('/sales-statistics', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller profile not found' });
    }

    // Get completed orders for this seller
    const orders = await Order.find({
      seller: sellerProfile._id,
      status: 'delivered'
    }).sort({ createdAt: 1 });

    // Get current date
    const today = new Date();
    
    // Initialize statistics arrays
    const dailyStats = Array(7).fill().map(() => ({ orders: 0, revenue: 0 }));
    const monthlyStats = Array(12).fill().map(() => ({ orders: 0, revenue: 0 }));
    
    // Calculate daily stats (last 7 days)
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayOrders = orders.filter(order => 
        new Date(order.createdAt) >= date && new Date(order.createdAt) < nextDate
      );
      
      dailyStats[6 - i] = {
        date: date.toISOString().split('T')[0],
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + order.totalPrice, 0)
      };
    }
    
    // Calculate monthly stats (last 12 months)
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      const monthOrders = orders.filter(order => 
        new Date(order.createdAt) >= date && new Date(order.createdAt) < nextMonth
      );
      
      monthlyStats[11 - i] = {
        month: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        orders: monthOrders.length,
        revenue: monthOrders.reduce((sum, order) => sum + order.totalPrice, 0)
      };
    }

    res.json({
      daily: dailyStats,
      monthly: monthlyStats
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 