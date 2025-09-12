/**
 * Dependency Injection Container
 * Manages all dependencies and follows Dependency Inversion Principle
 * Provides a centralized way to configure and resolve dependencies
 */
class DIContainer {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  /**
   * Register a service with its dependencies
   * @param {string} name - Service name
   * @param {Function} factory - Factory function to create the service
   * @param {Array} dependencies - Array of dependency names
   * @param {boolean} singleton - Whether to create as singleton
   */
  register(name, factory, dependencies = [], singleton = true) {
    this.services.set(name, {
      factory,
      dependencies,
      singleton,
    });
  }

  /**
   * Resolve a service and its dependencies
   * @param {string} name - Service name
   * @returns {*} The resolved service instance
   */
  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service '${name}' not found`);
    }

    // Return singleton if already created
    if (service.singleton && this.singletons.has(name)) {
      return this.singletons.get(name);
    }

    // Resolve dependencies
    const dependencies = service.dependencies.map(dep => this.resolve(dep));

    // Create service instance
    const instance = service.factory(...dependencies);

    // Store singleton if needed
    if (service.singleton) {
      this.singletons.set(name, instance);
    }

    return instance;
  }

  /**
   * Check if a service is registered
   * @param {string} name - Service name
   * @returns {boolean}
   */
  has(name) {
    return this.services.has(name);
  }

  /**
   * Clear all services and singletons
   */
  clear() {
    this.services.clear();
    this.singletons.clear();
  }
}

module.exports = DIContainer;

