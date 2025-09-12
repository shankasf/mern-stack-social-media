const IUserRepository = require('../interfaces/IUserRepository');
const User = require('../models/User');

/**
 * Concrete implementation of IUserRepository
 * Handles all user data operations (Single Responsibility Principle)
 */
class UserRepository extends IUserRepository {
  async create(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id).select('-password');
      return user;
    } catch (error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      throw new Error(`Failed to find all users: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
