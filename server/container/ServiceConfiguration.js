const DIContainer = require('./DIContainer');

// Import repositories
const UserRepository = require('../repositories/UserRepository');
const PostRepository = require('../repositories/PostRepository');
const CommentRepository = require('../repositories/CommentRepository');

// Import services
const AuthService = require('../services/AuthService');
const PostService = require('../services/PostService');
const ValidationService = require('../services/ValidationService');
const LoggingService = require('../services/LoggingService');

// Import controllers
const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');

/**
 * Service Configuration
 * Configures all dependencies following SOLID principles
 * Uses Dependency Injection Container for managing dependencies
 */
class ServiceConfiguration {
  constructor() {
    this.container = new DIContainer();
    this.configureServices();
  }

  /**
   * Configure all services and their dependencies
   */
  configureServices() {
    // Register repositories
    this.container.register('userRepository', () => new UserRepository(), [], true);
    this.container.register('postRepository', () => new PostRepository(), [], true);
    this.container.register('commentRepository', () => new CommentRepository(), [], true);

    // Register utility services
    this.container.register('validationService', () => new ValidationService(), [], true);
    this.container.register('loggingService', () => new LoggingService(), [], true);

    // Register services with their dependencies
    this.container.register(
      'authService',
      (userRepository) => new AuthService(userRepository),
      ['userRepository'],
      true
    );

    this.container.register(
      'postService',
      (postRepository, commentRepository) => new PostService(postRepository, commentRepository),
      ['postRepository', 'commentRepository'],
      true
    );

    // Register controllers with their dependencies
    this.container.register(
      'authController',
      (authService) => new AuthController(authService),
      ['authService'],
      true
    );

    this.container.register(
      'postController',
      (postService) => new PostController(postService),
      ['postService'],
      true
    );
  }

  /**
   * Get a service from the container
   * @param {string} serviceName - Name of the service to retrieve
   * @returns {*} The resolved service instance
   */
  get(serviceName) {
    return this.container.resolve(serviceName);
  }

  /**
   * Get the dependency injection container
   * @returns {DIContainer} The DI container instance
   */
  getContainer() {
    return this.container;
  }
}

module.exports = ServiceConfiguration;
