const IAuthService = require('../interfaces/IAuthService');

/**
 * Authentication Middleware
 * Handles JWT token verification (Single Responsibility Principle)
 * Depends on abstractions (Dependency Inversion Principle)
 */
class AuthMiddleware {
  constructor(authService) {
    if (!(authService instanceof IAuthService)) {
      throw new Error('AuthService must implement IAuthService interface');
    }
    this.authService = authService;
  }

  /**
   * Middleware function to protect routes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function
   */
  async protect(req, res, next) {
    try {
      let token;

      // Extract token from Authorization header
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

      // Verify token and get user
      const user = await this.authService.verifyToken(token);
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  /**
   * Optional authentication middleware
   * Sets user if token is valid, but doesn't require it
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function
   */
  async optionalAuth(req, res, next) {
    try {
      let token;

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (token) {
        try {
          const user = await this.authService.verifyToken(token);
          req.user = user;
        } catch (error) {
          // Token is invalid, but we don't fail the request
          console.warn('Invalid token in optional auth:', error.message);
        }
      }

      next();
    } catch (error) {
      console.error('Optional auth middleware error:', error);
      next(); // Continue even if there's an error
    }
  }
}

module.exports = AuthMiddleware;