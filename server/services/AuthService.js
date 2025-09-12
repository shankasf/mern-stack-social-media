const IAuthService = require('../interfaces/IAuthService');
const IUserRepository = require('../interfaces/IUserRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Concrete implementation of IAuthService
 * Handles authentication business logic (Single Responsibility Principle)
 * Depends on abstractions (Dependency Inversion Principle)
 */
class AuthService extends IAuthService {
  constructor(userRepository) {
    super();
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error('UserRepository must implement IUserRepository interface');
    }
    this.userRepository = userRepository;
  }

  async register(userData) {
    try {
      const { name, email, password, collegeId } = userData;

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Create user
      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        collegeId,
      });

      // Generate token
      const token = this.generateToken(user._id);

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        collegeId: user.collegeId,
        token,
      };
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await this.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      const token = this.generateToken(user._id);

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        collegeId: user.collegeId,
        token,
      };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  generateToken(userId) {
    try {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
    } catch (error) {
      throw new Error(`Token generation failed: ${error.message}`);
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userRepository.findById(decoded.id);
      return user;
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(`Password hashing failed: ${error.message}`);
    }
  }

  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(`Password comparison failed: ${error.message}`);
    }
  }
}

module.exports = AuthService;

