/**
 * Interface for Post Service
 * Defines the contract for post business logic operations
 */
class IPostService {
  async createPost(userId, postData) {
    throw new Error('Method createPost must be implemented');
  }

  async getPosts() {
    throw new Error('Method getPosts must be implemented');
  }

  async getPostById(postId) {
    throw new Error('Method getPostById must be implemented');
  }

  async updatePost(postId, userId, updateData) {
    throw new Error('Method updatePost must be implemented');
  }

  async deletePost(postId, userId) {
    throw new Error('Method deletePost must be implemented');
  }

  async likePost(postId, userId) {
    throw new Error('Method likePost must be implemented');
  }

  async addComment(postId, userId, commentData) {
    throw new Error('Method addComment must be implemented');
  }
}

module.exports = IPostService;
