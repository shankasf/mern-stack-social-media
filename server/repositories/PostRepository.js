const IPostRepository = require('../interfaces/IPostRepository');
const Post = require('../models/Post');

/**
 * Concrete implementation of IPostRepository
 * Handles all post data operations (Single Responsibility Principle)
 */
class PostRepository extends IPostRepository {
  async create(postData) {
    try {
      const post = await Post.create(postData);
      return post;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const post = await Post.findById(id)
        .populate('user', 'name profilePicture')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name profilePicture',
          },
        });
      return post;
    } catch (error) {
      throw new Error(`Failed to find post by ID: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const posts = await Post.find()
        .populate('user', 'name profilePicture')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name profilePicture',
          },
        })
        .sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw new Error(`Failed to find all posts: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const post = await Post.findByIdAndUpdate(id, updateData, { new: true })
        .populate('user', 'name profilePicture')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name profilePicture',
          },
        });
      return post;
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      await Post.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }

  async findByUser(userId) {
    try {
      const posts = await Post.find({ user: userId })
        .populate('user', 'name profilePicture')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name profilePicture',
          },
        })
        .sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw new Error(`Failed to find posts by user: ${error.message}`);
    }
  }

  async addLike(postId, userId) {
    try {
      const post = await Post.findById(postId);
      if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        await post.save();
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to add like: ${error.message}`);
    }
  }

  async removeLike(postId, userId) {
    try {
      const post = await Post.findById(postId);
      post.likes = post.likes.filter(like => like.toString() !== userId.toString());
      await post.save();
      return post;
    } catch (error) {
      throw new Error(`Failed to remove like: ${error.message}`);
    }
  }

  async addComment(postId, commentId) {
    try {
      const post = await Post.findById(postId);
      post.comments.push(commentId);
      await post.save();
      return post;
    } catch (error) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }
}

module.exports = PostRepository;
