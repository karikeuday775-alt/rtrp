const express = require('express');
const { body, validationResult } = require('express-validator');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      area,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    if (location) {
      filter['location.neighborhood'] = new RegExp(location, 'i');
    }

    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = parseInt(minPrice);
      if (maxPrice) filter['price.amount'].$lte = parseInt(maxPrice);
    }

    if (propertyType) {
      filter.type = propertyType;
    }

    if (bedrooms) {
      filter.bedrooms = parseInt(bedrooms);
    }

    if (area) {
      filter['area.total'] = { $gte: parseInt(area) };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const properties = await Property.find(filter)
      .populate('seller', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      message: 'Failed to fetch properties',
      error: error.message
    });
  }
});

// Search properties
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: 'Search query is required'
      });
    }

    const searchRegex = new RegExp(q, 'i');

    const properties = await Property.find({
      status: 'active',
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { 'location.address': searchRegex },
        { 'location.neighborhood': searchRegex },
        { type: searchRegex }
      ]
    })
    .populate('seller', 'name email phone')
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({ properties });
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({
      message: 'Search failed',
      error: error.message
    });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('seller', 'name email phone');

    if (!property) {
      return res.status(404).json({
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      message: 'Failed to fetch property',
      error: error.message
    });
  }
});

// Create property (sellers only)
router.post('/', auth, [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('type').isIn(['villa', 'apartment', 'land', 'commercial', 'penthouse']).withMessage('Invalid property type'),
  body('price.amount').isNumeric().withMessage('Price must be a number'),
  body('area.total').isNumeric().withMessage('Area must be a number'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
  body('location.address').trim().notEmpty().withMessage('Address is required')
], async (req, res) => {
  try {
    // Check if user is seller or admin
    if (!['seller', 'admin'].includes(req.userDoc.role)) {
      return res.status(403).json({
        message: 'Only sellers and admins can create properties'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const propertyData = {
      ...req.body,
      seller: req.user.userId
    };

    const property = new Property(propertyData);
    await property.save();

    await property.populate('seller', 'name email phone');

    res.status(201).json({
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      message: 'Failed to create property',
      error: error.message
    });
  }
});

// Update property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: 'Property not found'
      });
    }

    // Check if user owns the property or is admin
    if (property.seller.toString() !== req.user.userId && req.userDoc.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this property'
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'name email phone');

    res.json({
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({
      message: 'Failed to update property',
      error: error.message
    });
  }
});

// Delete property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: 'Property not found'
      });
    }

    // Check if user owns the property or is admin
    if (property.seller.toString() !== req.user.userId && req.userDoc.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to delete this property'
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      message: 'Failed to delete property',
      error: error.message
    });
  }
});

module.exports = router;