/**
 * Interface for Comment Repository
 * Defines the contract for comment data operations
 */
class ICommentRepository {
  async create(commentData) {
    throw new Error('Method create must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findByPost(postId) {
    throw new Error('Method findByPost must be implemented');
  }

  async update(id, updateData) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  async deleteByPost(postId) {
    throw new Error('Method deleteByPost must be implemented');
  }
}

module.exports = ICommentRepository;
