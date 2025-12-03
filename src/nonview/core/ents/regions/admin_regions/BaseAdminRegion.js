class BaseAdminRegion extends BaseRegion {
  static getAdminRegionType() {
    throw new Error("Not Implemented");
  }

  async getPolygon() {
    return await WWW.fetchJSON(
      "https://raw.githubusercontent.com" +
        "/nuuuwan/gig-data/refs/heads/master" +
        `/geo/${this.constructor.getAdminRegionType()}/${this.id}.json`
    );
  }
}
