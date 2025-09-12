const express = require('express');

/**
 * Auth Routes
 * Handles authentication routes (Single Responsibility Principle)
 * Uses dependency injection for controllers
 */
class AuthRoutes {
  constructor(authController) {
    this.router = express.Router();
    this.authController = authController;
    this.setupRoutes();
  }

  /**
   * Setup all authentication routes
   */
  setupRoutes() {
    // Bind methods to preserve 'this' context
    this.router.post('/register', this.authController.registerUser.bind(this.authController));
    this.router.post('/login', this.authController.loginUser.bind(this.authController));
  }

  /**
   * Get the router instance
   * @returns {express.Router} Express router instance
   */
  getRouter() {
    return this.router;
  }
}

module.exports = AuthRoutes;