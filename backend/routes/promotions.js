const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Promotion = require('../model/Promotion');
const Seller = require('../model/Seller');
const { protect, seller } = require('../middleware/auth');

// @route   POST api/promotions
// @desc    Create a promotion
// @access  Private/Seller
router.post(
  '/',
  protect,
  seller,
  [
    body('code', 'Promotion code is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('discountType', 'Discount type is required').isIn(['percentage', 'fixed']),
    body('discountValue', 'Discount value is required').isNumeric(),
    body('startDate', 'Start date is required').isISO8601(),
    body('endDate', 'End date is required').isISO8601(),
    body('minOrderAmount', 'Minimum order amount is required').isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find seller
      const sellerProfile = await Seller.findOne({ user: req.user.id });
      if (!sellerProfile) {
        return res.status(404).json({ msg: 'Seller not found' });
      }

      // Check if code already exists
      const existingPromotion = await Promotion.findOne({ 
        code: req.body.code,
        seller: sellerProfile._id
      });
      
      if (existingPromotion) {
        return res.status(400).json({ msg: 'Promotion code already exists' });
      }

      // Create promotion
      const promotion = new Promotion({
        seller: sellerProfile._id,
        code: req.body.code,
        description: req.body.description,
        discountType: req.body.discountType,
        discountValue: req.body.discountValue,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        minOrderAmount: req.body.minOrderAmount,
        maxUses: req.body.maxUses || null,
        isForStudentsOnly: req.body.isForStudentsOnly === 'true',
        requiredLoyaltyLevel: req.body.requiredLoyaltyLevel || null
      });

      await promotion.save();
      res.status(201).json(promotion);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/promotions
// @desc    Get all seller promotions
// @access  Private/Seller
router.get('/', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    const promotions = await Promotion.find({ seller: sellerProfile._id })
      .sort({ createdAt: -1 });

    res.json(promotions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/promotions/active
// @desc    Get all active promotions for a seller
// @access  Public
router.get('/active/:sellerId', async (req, res) => {
  try {
    const currentDate = new Date();
    
    const promotions = await Promotion.find({
      seller: req.params.sellerId,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true
    });

    res.json(promotions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/promotions/:id
// @desc    Get promotion by id
// @access  Private/Seller
router.get('/:id', protect, seller, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(404).json({ msg: 'Promotion not found' });
    }

    // Check if promotion belongs to seller
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (promotion.seller.toString() !== sellerProfile._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(promotion);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Promotion not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/promotions/:id
// @desc    Update a promotion
// @access  Private/Seller
router.put(
  '/:id',
  protect,
  seller,
  async (req, res) => {
    try {
      let promotion = await Promotion.findById(req.params.id);

      if (!promotion) {
        return res.status(404).json({ msg: 'Promotion not found' });
      }

      // Check if promotion belongs to seller
      const sellerProfile = await Seller.findOne({ user: req.user.id });
      if (promotion.seller.toString() !== sellerProfile._id.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      // Build update object
      const updateFields = {};
      if (req.body.description) updateFields.description = req.body.description;
      if (req.body.discountType) updateFields.discountType = req.body.discountType;
      if (req.body.discountValue) updateFields.discountValue = req.body.discountValue;
      if (req.body.startDate) updateFields.startDate = req.body.startDate;
      if (req.body.endDate) updateFields.endDate = req.body.endDate;
      if (req.body.minOrderAmount) updateFields.minOrderAmount = req.body.minOrderAmount;
      if (req.body.maxUses !== undefined) updateFields.maxUses = req.body.maxUses;
      if (req.body.isActive !== undefined) updateFields.isActive = req.body.isActive === 'true';
      if (req.body.isForStudentsOnly !== undefined) updateFields.isForStudentsOnly = req.body.isForStudentsOnly === 'true';
      if (req.body.requiredLoyaltyLevel) updateFields.requiredLoyaltyLevel = req.body.requiredLoyaltyLevel;

      promotion = await Promotion.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
      );

      res.json(promotion);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Promotion not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/promotions/:id
// @desc    Delete a promotion
// @access  Private/Seller
router.delete('/:id', protect, seller, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(404).json({ msg: 'Promotion not found' });
    }

    // Check if promotion belongs to seller
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (promotion.seller.toString() !== sellerProfile._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await promotion.deleteOne();
    res.json({ msg: 'Promotion removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Promotion not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/promotions/validate
// @desc    Validate a promotion code
// @access  Public
router.post(
  '/validate',
  [
    body('code', 'Promotion code is required').not().isEmpty(),
    body('sellerId', 'Seller ID is required').not().isEmpty(),
    body('orderAmount', 'Order amount is required').isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { code, sellerId, orderAmount, studentId, loyaltyLevel } = req.body;
      const currentDate = new Date();

      // Find promotion
      const promotion = await Promotion.findOne({
        code,
        seller: sellerId,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
        isActive: true,
        minOrderAmount: { $lte: orderAmount }
      });

      if (!promotion) {
        return res.status(400).json({ msg: 'Invalid promotion code' });
      }

      // Check if for students only
      if (promotion.isForStudentsOnly && !studentId) {
        return res.status(400).json({ msg: 'This promotion is for students only' });
      }

      // Check loyalty level requirement
      if (promotion.requiredLoyaltyLevel && 
          loyaltyLevel && 
          !isLoyaltyLevelSufficient(loyaltyLevel, promotion.requiredLoyaltyLevel)) {
        return res.status(400).json({ 
          msg: `This promotion requires ${promotion.requiredLoyaltyLevel} loyalty level` 
        });
      }

      // Check max uses
      if (promotion.maxUses !== null && promotion.uses >= promotion.maxUses) {
        return res.status(400).json({ msg: 'Promotion code has reached maximum uses' });
      }

      // Calculate discount
      let discount = 0;
      if (promotion.discountType === 'percentage') {
        discount = (orderAmount * promotion.discountValue) / 100;
      } else {
        discount = promotion.discountValue;
      }

      // Return discount information
      res.json({
        valid: true,
        discount,
        promotion
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Helper function to check loyalty level
function isLoyaltyLevelSufficient(userLevel, requiredLevel) {
  const levels = ['bronze', 'silver', 'gold', 'platinum'];
  const userLevelIndex = levels.indexOf(userLevel);
  const requiredLevelIndex = levels.indexOf(requiredLevel);
  
  return userLevelIndex >= requiredLevelIndex;
}

module.exports = router; 