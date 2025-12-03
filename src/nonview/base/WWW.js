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

  static async fetchTSV(url) {
    const key = `WWW.fetchTSV:${url}`;
    return Cache.get(key, async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      const lines = text.trim().split("\n");
      if (lines.length === 0) {
        return [];
      }
      const headers = lines[0].split("\t");
      return lines.slice(1).map((line) => {
        const values = line.split("\t");
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
        }, {});
      });
    });
  }

  static async fetch(url) {
    if (url.endsWith(".json")) {
      return this.fetchJSON(url);
    }
    if (url.endsWith(".tsv")) {
      return this.fetchTSV(url);
    }
    throw new Error(`Unsupported file format for URL: ${url}`);
  }
}
