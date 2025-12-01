export default class Cache {
  static async get(key, callback) {
    try {
      const cachedValue = localStorage.getItem(key);
      if (cachedValue !== null) {
        return JSON.parse(cachedValue);
      }
    } catch (error) {
      console.error(`Error reading from cache for key "${key}":`, error);
    }

    const value = await callback();

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to cache for key "${key}":`, error);
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
