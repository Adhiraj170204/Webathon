const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Student = require('../model/Student');
const Seller = require('../model/Seller');
const { protect } = require('../middleware/auth');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST api/auth/register/student
// @desc    Register a student
// @access  Public
router.post(
  '/register/student',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('collegeId', 'College ID is required').not().isEmpty(),
    body('phone', 'Phone number is required').not().isEmpty(),
    body('hostel', 'Hostel name is required').not().isEmpty(),
    body('roomNumber', 'Room number is required').not().isEmpty()
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, collegeId, phone, hostel, roomNumber } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Check if collegeId is already registered
      let studentExists = await Student.findOne({ collegeId });
      if (studentExists) {
        return res.status(400).json({ msg: 'College ID already registered' });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
        role: 'student'
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      // Create student profile
      const student = new Student({
        user: user._id,
        collegeId,
        phone,
        hostel,
        roomNumber
      });

      await student.save();

      // Return JWT
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        student: {
          collegeId: student.collegeId,
          phone: student.phone,
          hostel: student.hostel,
          roomNumber: student.roomNumber,
          shoppingPoints: student.shoppingPoints,
          loyaltyLevel: student.loyaltyLevel
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/register/seller
// @desc    Register a seller
// @access  Public
router.post(
  '/register/seller',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('storeName', 'Store name is required').not().isEmpty(),
    body('storeAddress', 'Store address is required').not().isEmpty(),
    body('phone', 'Phone number is required').not().isEmpty()
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, storeName, storeAddress, phone, openingTime, closingTime } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
        role: 'seller'
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      // Create seller profile
      const seller = new Seller({
        user: user._id,
        storeName,
        storeAddress,
        phone,
        openingTime: openingTime || '09:00',
        closingTime: closingTime || '20:00'
      });

      await seller.save();

      // Return JWT
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        seller: {
          storeName: seller.storeName,
          storeAddress: seller.storeAddress,
          phone: seller.phone,
          openingTime: seller.openingTime,
          closingTime: seller.closingTime
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Return user data based on role
      if (user.role === 'student') {
        const student = await Student.findOne({ user: user._id });
        
        if (!student) {
          return res.status(404).json({ msg: 'Student profile not found' });
        }

        const token = generateToken(user._id);
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
          student: {
            collegeId: student.collegeId,
            phone: student.phone,
            hostel: student.hostel,
            roomNumber: student.roomNumber,
            shoppingPoints: student.shoppingPoints,
            loyaltyLevel: student.loyaltyLevel
          }
        });
      } else if (user.role === 'seller') {
        const seller = await Seller.findOne({ user: user._id });
        
        if (!seller) {
          return res.status(404).json({ msg: 'Seller profile not found' });
        }

        const token = generateToken(user._id);
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
          seller: {
            storeName: seller.storeName,
            storeAddress: seller.storeAddress,
            phone: seller.phone,
            openingTime: seller.openingTime,
            closingTime: seller.closingTime
          }
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role === 'student') {
      const student = await Student.findOne({ user: user._id });
      
      if (!student) {
        return res.status(404).json({ msg: 'Student profile not found' });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: {
          collegeId: student.collegeId,
          phone: student.phone,
          hostel: student.hostel,
          roomNumber: student.roomNumber,
          shoppingPoints: student.shoppingPoints,
          loyaltyLevel: student.loyaltyLevel
        }
      });
    } else if (user.role === 'seller') {
      const seller = await Seller.findOne({ user: user._id });
      
      if (!seller) {
        return res.status(404).json({ msg: 'Seller profile not found' });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        seller: {
          storeName: seller.storeName,
          storeAddress: seller.storeAddress,
          phone: seller.phone,
          openingTime: seller.openingTime,
          closingTime: seller.closingTime
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;