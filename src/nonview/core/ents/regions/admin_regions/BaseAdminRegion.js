class BaseAdminRegion extends BaseRegion {
  static getAdminRegionType() {
    throw new Error("Not Implemented");
  }

  async getPolygon() {
    const url =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master" +
      `/geo/${this.constructor.getAdminRegionType()}/${this.id}.json`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const geoData = await response.json();
      return geoData;
    } catch (error) {
      console.error(
        `Error loading polygon for ${this.constructor.getAdminRegionType()} ID ${
          this.id
        }:`,
        error
      );
      return null;
    }
  }
}
