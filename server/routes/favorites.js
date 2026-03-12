const express = require('express');
const auth = require('../middleware/auth');
const Favorite = require('../models/Favorite');

const router = express.Router();

// Get user favorites
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId })
      .populate('property')
      .sort({ createdAt: -1 });

    res.json({ 
      favorites: favorites.map(fav => ({
        propertyId: fav.property._id,
        property: fav.property,
        createdAt: fav.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({
      message: 'Failed to fetch favorites',
      error: error.message
    });
  }
});

// Add to favorites
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId } = req.body;
    
    if (!propertyId) {
      return res.status(400).json({
        message: 'Property ID is required'
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      user: req.user.userId,
      property: propertyId
    });

    if (existingFavorite) {
      return res.status(400).json({
        message: 'Property already in favorites'
      });
    }

    const favorite = new Favorite({
      user: req.user.userId,
      property: propertyId
    });

    await favorite.save();
    await favorite.populate('property');

    res.status(201).json({
      message: 'Added to favorites',
      favorite: {
        propertyId: favorite.property._id,
        property: favorite.property,
        createdAt: favorite.createdAt
      }
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({
      message: 'Failed to add to favorites',
      error: error.message
    });
  }
});

// Remove from favorites
router.delete('/:propertyId', auth, async (req, res) => {
  try {
    const { propertyId } = req.params;

    const result = await Favorite.findOneAndDelete({
      user: req.user.userId,
      property: propertyId
    });

    if (!result) {
      return res.status(404).json({
        message: 'Favorite not found'
      });
    }

    res.json({
      message: 'Removed from favorites'
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({
      message: 'Failed to remove from favorites',
      error: error.message
    });
  }
});

module.exports = router;