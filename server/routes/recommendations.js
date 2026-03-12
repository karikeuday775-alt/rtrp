const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Get AI recommendations for user
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Simple recommendation algorithm (in real app, use ML/AI)
    const recommendations = await Property.find({ status: 'active' })
      .populate('seller', 'name email phone')
      .sort({ 'aiScore.overall': -1 })
      .limit(10);

    res.json({
      recommendations,
      message: 'Recommendations generated successfully'
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      message: 'Failed to generate recommendations',
      error: error.message
    });
  }
});

module.exports = router;