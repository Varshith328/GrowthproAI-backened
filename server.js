const express = require('express');
const cors = require('cors');
const businessRoutes = require('./routes/business');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Handle multiple allowed origins from .env (comma-separated)
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(origin => origin.trim());

// ✅ CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed from origin: ${origin}`));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', businessRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'GrowthProAI Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 GrowthProAI Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Business API: http://localhost:${PORT}/api/business-data`);
});
