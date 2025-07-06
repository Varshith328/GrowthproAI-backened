const express = require('express');
const { generateHeadline, getRandomHeadline } = require('../utils/headlines');
const router = express.Router();

// Simulate Google Business data
const generateBusinessData = (name, location) => {
  // Generate realistic ratings between 3.5 and 5.0
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  // Generate realistic review counts
  const reviewRanges = [
    { min: 15, max: 50 },
    { min: 51, max: 150 },
    { min: 151, max: 500 },
    { min: 501, max: 1000 }
  ];
  
  const range = reviewRanges[Math.floor(Math.random() * reviewRanges.length)];
  const reviews = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  
  return {
    rating: parseFloat(rating),
    reviews,
    headline: generateHeadline(name, location) // Using the imported function
  };
};

// POST /api/business-data
router.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Both business name and location are required'
      });
    }
    
    const businessData = generateBusinessData(name, location);
    
    res.status(200).json({
      success: true,
      data: businessData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in business-data endpoint:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate business data'
    });
  }
});

// GET /api/regenerate-headline
router.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    if (!name || !location) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Both name and location query parameters are required'
      });
    }
    
    const headline = getRandomHeadline(name, location); // Using the imported function
    
    res.status(200).json({
      success: true,
      headline,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in regenerate-headline endpoint:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate new headline'
    });
  }
});

module.exports = router;