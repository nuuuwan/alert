export default class Cache {
  static SALT = "v1";
  static CACHE_DURATION_MS = 60 * 60 * 1000;

  static async get(key, callback) {
    const roundedTimestamp = Math.floor(Date.now() / this.CACHE_DURATION_MS);
    const cacheKey = `${key}-${roundedTimestamp}-${this.SALT}`;

    try {
      const cachedValue = localStorage.getItem(cacheKey);
      if (cachedValue !== null) {
        return JSON.parse(cachedValue);
      }
    } catch (error) {
      console.error(`Error reading from cache for key "${cacheKey}":`, error);
    }

    const value = await callback();

    try {
      localStorage.setItem(cacheKey, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to cache for key "${cacheKey}":`, error);
    }

    return value;
  }

  static clear(key) {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  }
}
