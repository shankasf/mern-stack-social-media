const IAuthService = require('../interfaces/IAuthService');

/**
 * AuthController - Handles HTTP requests for authentication
 * Follows Single Responsibility Principle - only handles auth HTTP concerns
 * Depends on abstractions (Dependency Inversion Principle)
 */
class AuthController {
  constructor(authService) {
    if (!(authService instanceof IAuthService)) {
      throw new Error('AuthService must implement IAuthService interface');
    }
    this.authService = authService;
  }

  /**
   * Register a new user
   * @route POST /api/auth/register
   */
  async registerUser(req, res) {
    try {
      const { name, email, password, collegeId } = req.body;

      // Input validation
      if (!name || !email || !password || !collegeId) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const result = await this.authService.register({
        name,
        email,
        password,
        collegeId,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Login user
   * @route POST /api/auth/login
   */
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await this.authService.login(email, password);

      res.json(result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = AuthController;