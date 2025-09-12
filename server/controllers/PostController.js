const IPostService = require('../interfaces/IPostService');

/**
 * PostController - Handles HTTP requests for posts
 * Follows Single Responsibility Principle - only handles post HTTP concerns
 * Depends on abstractions (Dependency Inversion Principle)
 */
class PostController {
  constructor(postService) {
    if (!(postService instanceof IPostService)) {
      throw new Error('PostService must implement IPostService interface');
    }
    this.postService = postService;
  }

  /**
   * Create a new post
   * @route POST /api/posts
   */
  async createPost(req, res) {
    try {
      const { content, imageUrl } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }

      const post = await this.postService.createPost(req.user._id, {
        content,
        imageUrl,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get all posts
   * @route GET /api/posts
   */
  async getPosts(req, res) {
    try {
      const posts = await this.postService.getPosts();
      res.json(posts);
    } catch (error) {
      console.error('Get posts error:', error);
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get single post
   * @route GET /api/posts/:id
   */
  async getPost(req, res) {
    try {
      const post = await this.postService.getPostById(req.params.id);
      res.json(post);
    } catch (error) {
      console.error('Get post error:', error);
      if (error.message === 'Post not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update post
   * @route PUT /api/posts/:id
   */
  async updatePost(req, res) {
    try {
      const post = await this.postService.updatePost(
        req.params.id,
        req.user._id,
        req.body
      );
      res.json(post);
    } catch (error) {
      console.error('Update post error:', error);
      if (error.message === 'Post not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Not authorized to update this post') {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Delete post
   * @route DELETE /api/posts/:id
   */
  async deletePost(req, res) {
    try {
      const result = await this.postService.deletePost(req.params.id, req.user._id);
      res.json(result);
    } catch (error) {
      console.error('Delete post error:', error);
      if (error.message === 'Post not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Not authorized to delete this post') {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Like/Unlike post
   * @route PUT /api/posts/:id/like
   */
  async likePost(req, res) {
    try {
      const post = await this.postService.likePost(req.params.id, req.user._id);
      res.json(post);
    } catch (error) {
      console.error('Like post error:', error);
      if (error.message === 'Post not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Add comment to post
   * @route POST /api/posts/:id/comments
   */
  async addComment(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
      }

      const comment = await this.postService.addComment(req.params.id, req.user._id, {
        text,
      });

      res.status(201).json(comment);
    } catch (error) {
      console.error('Add comment error:', error);
      if (error.message === 'Post not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PostController;

