const IPostService = require('../interfaces/IPostService');
const IPostRepository = require('../interfaces/IPostRepository');
const ICommentRepository = require('../interfaces/ICommentRepository');

/**
 * Concrete implementation of IPostService
 * Handles post business logic (Single Responsibility Principle)
 * Depends on abstractions (Dependency Inversion Principle)
 */
class PostService extends IPostService {
  constructor(postRepository, commentRepository) {
    super();
    if (!(postRepository instanceof IPostRepository)) {
      throw new Error('PostRepository must implement IPostRepository interface');
    }
    if (!(commentRepository instanceof ICommentRepository)) {
      throw new Error('CommentRepository must implement ICommentRepository interface');
    }
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  async createPost(userId, postData) {
    try {
      const { content, imageUrl } = postData;

      const post = await this.postRepository.create({
        user: userId,
        content,
        imageUrl: imageUrl || '',
      });

      return await this.postRepository.findById(post._id);
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async getPosts() {
    try {
      return await this.postRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to get posts: ${error.message}`);
    }
  }

  async getPostById(postId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to get post: ${error.message}`);
    }
  }

  async updatePost(postId, userId, updateData) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if user owns the post
      if (post.user._id.toString() !== userId.toString()) {
        throw new Error('Not authorized to update this post');
      }

      return await this.postRepository.update(postId, updateData);
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  async deletePost(postId, userId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if user owns the post
      if (post.user._id.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this post');
      }

      // Delete all comments associated with this post
      await this.commentRepository.deleteByPost(postId);

      await this.postRepository.delete(postId);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }

  async likePost(postId, userId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      const isLiked = post.likes.some(like => like._id.toString() === userId.toString());

      if (isLiked) {
        await this.postRepository.removeLike(postId, userId);
      } else {
        await this.postRepository.addLike(postId, userId);
      }

      return await this.postRepository.findById(postId);
    } catch (error) {
      throw new Error(`Failed to like post: ${error.message}`);
    }
  }

  async addComment(postId, userId, commentData) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      const { text } = commentData;

      const comment = await this.commentRepository.create({
        user: userId,
        post: postId,
        text,
      });

      // Add comment to post
      await this.postRepository.addComment(postId, comment._id);

      return await this.commentRepository.findById(comment._id);
    } catch (error) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }
}

module.exports = PostService;

