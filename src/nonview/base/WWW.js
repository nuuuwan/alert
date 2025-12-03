class WWW {
  static async fetchJSON(url) {
    const key = `WWW.fetchJSON:${url}`;
    return Cache.length(key, async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    });
  }
}
