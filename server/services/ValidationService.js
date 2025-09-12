/**
 * Validation Service
 * Handles input validation (Single Responsibility Principle)
 * Can be extended for different validation rules (Open/Closed Principle)
 */
class ValidationService {
  /**
   * Validate user registration data
   * @param {Object} userData - User data to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validateUserRegistration(userData) {
    const errors = [];
    const { name, email, password, collegeId } = userData;

    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
    } else if (!this.isValidEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    // College ID validation
    if (!collegeId || typeof collegeId !== 'string' || collegeId.trim().length < 3) {
      errors.push('College ID must be at least 3 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate user login data
   * @param {Object} loginData - Login data to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validateUserLogin(loginData) {
    const errors = [];
    const { email, password } = loginData;

    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
    } else if (!this.isValidEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (!password || typeof password !== 'string') {
      errors.push('Password is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate post data
   * @param {Object} postData - Post data to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validatePost(postData) {
    const errors = [];
    const { content, imageUrl } = postData;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      errors.push('Post content is required');
    } else if (content.length > 1000) {
      errors.push('Post content must be less than 1000 characters');
    }

    if (imageUrl && typeof imageUrl !== 'string') {
      errors.push('Image URL must be a valid string');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate comment data
   * @param {Object} commentData - Comment data to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validateComment(commentData) {
    const errors = [];
    const { text } = commentData;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      errors.push('Comment text is required');
    } else if (text.length > 500) {
      errors.push('Comment must be less than 500 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sanitize string input
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeString(input) {
    if (typeof input !== 'string') {
      return '';
    }
    return input.trim();
  }
}

module.exports = ValidationService;

