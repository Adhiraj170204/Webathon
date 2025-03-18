const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../model/Student');
const Order = require('../model/Order');
const User = require('../model/User');
const { protect, student } = require('../middleware/auth');

// @route   GET api/students/profile
// @desc    Get student profile
// @access  Private/Student
router.get('/profile', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student profile not found' });
    }

    res.json(studentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/students/profile
// @desc    Update student profile
// @access  Private/Student
router.put(
  '/profile',
  protect,
  student,
  [
    body('phone', 'Phone number is required').not().isEmpty(),
    body('hostel', 'Hostel name is required').not().isEmpty(),
    body('roomNumber', 'Room number is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Build update object
      const updateFields = {};
      if (req.body.phone) updateFields.phone = req.body.phone;
      if (req.body.hostel) updateFields.hostel = req.body.hostel;
      if (req.body.roomNumber) updateFields.roomNumber = req.body.roomNumber;

      // Update student profile
      const studentProfile = await Student.findOneAndUpdate(
        { user: req.user.id },
        { $set: updateFields },
        { new: true }
      );

      if (!studentProfile) {
        return res.status(404).json({ msg: 'Student profile not found' });
      }

      res.json(studentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/students/order-history
// @desc    Get student order history
// @access  Private/Student
router.get('/order-history', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student profile not found' });
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

// @route   GET api/students/loyalty
// @desc    Get student loyalty info
// @access  Private/Student
router.get('/loyalty', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student profile not found' });
    }

    // Calculate points to next level
    let pointsToNextLevel = 0;
    let nextLevel = '';

    if (studentProfile.loyaltyLevel === 'bronze') {
      pointsToNextLevel = 200 - studentProfile.shoppingPoints;
      nextLevel = 'silver';
    } else if (studentProfile.loyaltyLevel === 'silver') {
      pointsToNextLevel = 500 - studentProfile.shoppingPoints;
      nextLevel = 'gold';
    } else if (studentProfile.loyaltyLevel === 'gold') {
      pointsToNextLevel = 1000 - studentProfile.shoppingPoints;
      nextLevel = 'platinum';
    }

    // Get order history for spending stats
    const orders = await Order.find({ 
      student: studentProfile._id,
      status: { $ne: 'cancelled' } 
    });

    // Calculate total spend
    const totalSpend = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Calculate average order value
    const avgOrderValue = orders.length > 0 ? totalSpend / orders.length : 0;

    res.json({
      currentPoints: studentProfile.shoppingPoints,
      currentLevel: studentProfile.loyaltyLevel,
      pointsToNextLevel: pointsToNextLevel > 0 ? pointsToNextLevel : 0,
      nextLevel: nextLevel || 'Maximum level reached',
      totalOrders: orders.length,
      totalSpend,
      avgOrderValue
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/students/wishlist
// @desc    Add product to wishlist
// @access  Private/Student
router.post(
  '/wishlist',
  protect,
  student,
  [
    body('productId', 'Product ID is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const studentProfile = await Student.findOne({ user: req.user.id });
      
      if (!studentProfile) {
        return res.status(404).json({ msg: 'Student profile not found' });
      }

      // Create wishlist array if it doesn't exist
      if (!studentProfile.wishlist) {
        studentProfile.wishlist = [];
      }

      // Check if already in wishlist
      if (studentProfile.wishlist.includes(req.body.productId)) {
        return res.status(400).json({ msg: 'Product already in wishlist' });
      }

      // Add to wishlist
      studentProfile.wishlist.push(req.body.productId);
      await studentProfile.save();

      res.json(studentProfile.wishlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/students/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private/Student
router.delete('/wishlist/:productId', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student profile not found' });
    }

    // Check if wishlist exists
    if (!studentProfile.wishlist) {
      return res.status(400).json({ msg: 'Wishlist is empty' });
    }

    // Remove from wishlist
    studentProfile.wishlist = studentProfile.wishlist.filter(
      productId => productId.toString() !== req.params.productId
    );

    await studentProfile.save();
    res.json(studentProfile.wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/students/wishlist
// @desc    Get student wishlist
// @access  Private/Student
router.get('/wishlist', protect, student, async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });
    
    if (!studentProfile) {
      return res.status(404).json({ msg: 'Student profile not found' });
    }

    // Check if wishlist exists
    if (!studentProfile.wishlist || studentProfile.wishlist.length === 0) {
      return res.json([]);
    }

    // Populate wishlist with product details
    const wishlist = await Student.findOne({ user: req.user.id })
      .select('wishlist')
      .populate('wishlist');

    res.json(wishlist.wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 