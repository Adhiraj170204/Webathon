const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../model/Product');
const Seller = require('../model/Seller');
const { protect, seller } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST api/products
// @desc    Create a product
// @access  Private/Seller
router.post(
  '/',
  protect,
  seller,
  upload.array('images', 5),
  [
    body('name', 'Product name is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
    body('price', 'Price is required').isNumeric(),
    body('unit', 'Unit is required').not().isEmpty(),
    body('stock', 'Stock is required').isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find seller
      const seller = await Seller.findOne({ user: req.user.id });
      if (!seller) {
        return res.status(404).json({ msg: 'Seller not found' });
      }

      // Process uploaded images
      const images = [];
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          images.push(`/uploads/${file.filename}`);
        });
      }

      // Create product
      const product = new Product({
        seller: seller._id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        discountedPrice: req.body.discountedPrice,
        unit: req.body.unit,
        stock: req.body.stock,
        images,
        isEssential: req.body.isEssential === 'true',
        isAvailable: req.body.isAvailable !== 'false'
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, seller, essential, minPrice, maxPrice, sort } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (seller) {
      query.seller = seller;
    }

    if (essential === 'true') {
      query.isEssential = true;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    // Only show available products
    query.isAvailable = true;

    // Build sort
    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default: newest first
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .populate('seller', 'storeName');

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/essentials
// @desc    Get essential products
// @access  Public
router.get('/essentials', async (req, res) => {
  try {
    const products = await Product.find({ isEssential: true, isAvailable: true })
      .sort({ createdAt: -1 })
      .populate('seller', 'storeName');

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/seller
// @desc    Get seller's products
// @access  Private/Seller
router.get('/seller', protect, seller, async (req, res) => {
  try {
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    const products = await Product.find({ seller: sellerProfile._id })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'storeName storeAddress phone openingTime closingTime');

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Seller
router.put(
  '/:id',
  protect,
  seller,
  upload.array('images', 5),
  async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Check product belongs to seller
      const sellerProfile = await Seller.findOne({ user: req.user.id });
      if (!sellerProfile) {
        return res.status(404).json({ msg: 'Seller not found' });
      }

      if (product.seller.toString() !== sellerProfile._id.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      // Process uploaded images
      const images = [...product.images];
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          images.push(`/uploads/${file.filename}`);
        });
      }

      // Build update object
      const updateFields = {};
      if (req.body.name) updateFields.name = req.body.name;
      if (req.body.description) updateFields.description = req.body.description;
      if (req.body.category) updateFields.category = req.body.category;
      if (req.body.price) updateFields.price = req.body.price;
      if (req.body.discountedPrice) updateFields.discountedPrice = req.body.discountedPrice;
      if (req.body.unit) updateFields.unit = req.body.unit;
      if (req.body.stock) updateFields.stock = req.body.stock;
      if (req.files && req.files.length > 0) updateFields.images = images;
      if (req.body.isEssential !== undefined) updateFields.isEssential = req.body.isEssential === 'true';
      if (req.body.isAvailable !== undefined) updateFields.isAvailable = req.body.isAvailable === 'true';

      product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
      );

      res.json(product);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Seller
router.delete('/:id', protect, seller, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check product belongs to seller
    const sellerProfile = await Seller.findOne({ user: req.user.id });
    if (!sellerProfile) {
      return res.status(404).json({ msg: 'Seller not found' });
    }

    if (product.seller.toString() !== sellerProfile._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await product.deleteOne();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/products/:id/review
// @desc    Add a product review
// @access  Private/Student
router.post(
  '/:id/review',
  protect,
  [
    body('rating', 'Rating is required').isNumeric(),
    body('comment', 'Comment is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Update product rating
      const { rating, comment } = req.body;
      
      // Calculate new rating average
      const newRating = ((product.rating * product.numReviews) + Number(rating)) / (product.numReviews + 1);
      
      product.rating = newRating;
      product.numReviews += 1;

      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

module.exports = router; 