const ICommentRepository = require('../interfaces/ICommentRepository');
const Comment = require('../models/Comment');

/**
 * Concrete implementation of ICommentRepository
 * Handles all comment data operations (Single Responsibility Principle)
 */
class CommentRepository extends ICommentRepository {
  async create(commentData) {
    try {
      const comment = await Comment.create(commentData);
      return comment;
    } catch (error) {
      throw new Error(`Failed to create comment: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const comment = await Comment.findById(id)
        .populate('user', 'name profilePicture');
      return comment;
    } catch (error) {
      throw new Error(`Failed to find comment by ID: ${error.message}`);
    }
  }

  async findByPost(postId) {
    try {
      const comments = await Comment.find({ post: postId })
        .populate('user', 'name profilePicture')
        .sort({ createdAt: -1 });
      return comments;
    } catch (error) {
      throw new Error(`Failed to find comments by post: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const comment = await Comment.findByIdAndUpdate(id, updateData, { new: true })
        .populate('user', 'name profilePicture');
      return comment;
    } catch (error) {
      throw new Error(`Failed to update comment: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      await Comment.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete comment: ${error.message}`);
    }
  }

  async deleteByPost(postId) {
    try {
      await Comment.deleteMany({ post: postId });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete comments by post: ${error.message}`);
    }
  }
}

module.exports = CommentRepository;
