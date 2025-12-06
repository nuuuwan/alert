import OpenMeteo from "../../third_party/OpenMeteo.js";
class Place {
  static getEntityTypeName() {
    return "Place";
  }
  constructor({ latLng, openMeteoData }) {
    this.latLng = latLng;
    this.openMeteoData = openMeteoData;
  }

  get supertitle() {
    return "Place";
  }

  get title() {
    return this.latLng.title;
  }

  get subtitle() {
    return `${this.elevation_m}m`;
  }

  get elevation_m() {
    return this.openMeteoData.elevation_m;
  }

  static async load({ latLng }) {
    const openMeteoData = await OpenMeteo.getData({ latLng });

    return new Place({ latLng, openMeteoData });
  }
}

export default Place;
