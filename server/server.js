const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const ServiceConfiguration = require('./container/ServiceConfiguration');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize dependency injection container
const serviceConfig = new ServiceConfiguration();

// Get services from container
const authController = serviceConfig.get('authController');
const postController = serviceConfig.get('postController');
const authService = serviceConfig.get('authService');

// Create middleware
const AuthMiddleware = require('./middleware/AuthMiddleware');
const authMiddleware = new AuthMiddleware(authService);

// Create routes
const AuthRoutes = require('./routes/AuthRoutes');
const PostRoutes = require('./routes/PostRoutes');

const authRoutes = new AuthRoutes(authController);
const postRoutes = new PostRoutes(postController, authMiddleware);

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Social Media API is running...',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes.getRouter());
app.use('/api/posts', postRoutes.getRouter());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;