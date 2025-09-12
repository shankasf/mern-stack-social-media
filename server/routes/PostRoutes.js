const express = require('express');

/**
 * Post Routes
 * Handles post-related routes (Single Responsibility Principle)
 * Uses dependency injection for controllers and middleware
 */
class PostRoutes {
  constructor(postController, authMiddleware) {
    this.router = express.Router();
    this.postController = postController;
    this.authMiddleware = authMiddleware;
    this.setupRoutes();
  }

  /**
   * Setup all post routes
   */
  setupRoutes() {
    // All routes are protected
    this.router.use(this.authMiddleware.protect.bind(this.authMiddleware));

    // Post CRUD routes
    this.router.post('/', this.postController.createPost.bind(this.postController));
    this.router.get('/', this.postController.getPosts.bind(this.postController));
    this.router.get('/:id', this.postController.getPost.bind(this.postController));
    this.router.put('/:id', this.postController.updatePost.bind(this.postController));
    this.router.delete('/:id', this.postController.deletePost.bind(this.postController));

    // Post interaction routes
    this.router.put('/:id/like', this.postController.likePost.bind(this.postController));
    this.router.post('/:id/comments', this.postController.addComment.bind(this.postController));
  }

  /**
   * Get the router instance
   * @returns {express.Router} Express router instance
   */
  getRouter() {
    return this.router;
  }
}

module.exports = PostRoutes;

