/**
 * Interface for Post Repository
 * Defines the contract for post data operations
 */
class IPostRepository {
  async create(postData) {
    throw new Error('Method create must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findAll() {
    throw new Error('Method findAll must be implemented');
  }

  async update(id, updateData) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  async findByUser(userId) {
    throw new Error('Method findByUser must be implemented');
  }

  async addLike(postId, userId) {
    throw new Error('Method addLike must be implemented');
  }

  async removeLike(postId, userId) {
    throw new Error('Method removeLike must be implemented');
  }

  async addComment(postId, commentId) {
    throw new Error('Method addComment must be implemented');
  }
}

module.exports = IPostRepository;
