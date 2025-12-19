export default class Cache {
  static SALT = "v1";
  static CACHE_DURATION_MS = 10 * 60 * 1000;
  static LOCAL_CACHE = {};

  static async get(key, callback) {
    const roundedTimestamp = Math.floor(Date.now() / this.CACHE_DURATION_MS);
    const cacheKey = `${key}-${roundedTimestamp}-${this.SALT}`;

    if (Cache.LOCAL_CACHE[cacheKey] !== undefined) {
      return Cache.LOCAL_CACHE[cacheKey];
    }

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
      const payload = JSON.stringify(value);
      const payloadSizeK = payload.length / 1_000;
      if (payloadSizeK > 100) {
        console.warn(`⚠️ [Cache] ${payloadSizeK}KB: "${cacheKey}"`);
      }
      localStorage.setItem(cacheKey, payload);
      Cache.LOCAL_CACHE[cacheKey] = value;
    } catch (error) {
      console.error(`Error writing to cache for key "${cacheKey}":`, error);
      localStorage.clear();
    }

    return value;
  }

  static clear(key) {
    if (key) {
      localStorage.removeItem(key);
      Cache.LOCAL_CACHE[key] = undefined;
    } else {
      localStorage.clear();
      Cache.LOCAL_CACHE = {};
    }
  }
}
