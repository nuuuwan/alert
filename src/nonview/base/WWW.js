import Cache from "./Cache";

export default class WWW {
  static async fetchJSON(url) {
    const key = `WWW.fetchJSON:${url}`;
    return Cache.get(key, async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    });
  }
}
