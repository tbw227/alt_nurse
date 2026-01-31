/**
 * Caching Abstraction Layer
 * Provides a consistent caching interface
 * Currently uses in-memory cache, ready for Redis integration
 */

// In-memory cache (replace with Redis in production)
const memoryCache = new Map();

/**
 * Cache interface
 * Ready for Redis, Memcached, or other caching solutions
 */
class Cache {
  constructor() {
    this.enabled = process.env.CACHE_ENABLED === 'true' || false;
    this.ttl = parseInt(process.env.CACHE_TTL || '3600', 10); // Default 1 hour
    this.type = process.env.CACHE_TYPE || 'memory';
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {Promise<any|null>}
   */
  async get(key) {
    if (!this.enabled) return null;

    // TODO: Replace with Redis
    // if (this.type === 'redis') {
    //   return await redisClient.get(key);
    // }

    const item = memoryCache.get(key);
    if (!item) return null;

    // Check if expired
    if (item.expiresAt && Date.now() > item.expiresAt) {
      memoryCache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds (optional)
   * @returns {Promise<void>}
   */
  async set(key, value, ttl = null) {
    if (!this.enabled) return;

    const expiresAt = ttl 
      ? Date.now() + (ttl * 1000)
      : Date.now() + (this.ttl * 1000);

    // TODO: Replace with Redis
    // if (this.type === 'redis') {
    //   return await redisClient.setex(key, ttl || this.ttl, JSON.stringify(value));
    // }

    memoryCache.set(key, {
      value,
      expiresAt,
      createdAt: Date.now(),
    });
  }

  /**
   * Delete value from cache
   * @param {string} key - Cache key
   * @returns {Promise<void>}
   */
  async delete(key) {
    // TODO: Replace with Redis
    // if (this.type === 'redis') {
    //   return await redisClient.del(key);
    // }

    memoryCache.delete(key);
  }

  /**
   * Clear all cache
   * @returns {Promise<void>}
   */
  async clear() {
    // TODO: Replace with Redis
    // if (this.type === 'redis') {
    //   return await redisClient.flushdb();
    // }

    memoryCache.clear();
  }

  /**
   * Check if key exists
   * @param {string} key - Cache key
   * @returns {Promise<boolean>}
   */
  async has(key) {
    if (!this.enabled) return false;

    // TODO: Replace with Redis
    // if (this.type === 'redis') {
    //   return await redisClient.exists(key) === 1;
    // }

    return memoryCache.has(key);
  }
}

// Export singleton instance
export default new Cache();
