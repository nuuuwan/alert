import OpenMeteo from "../../third_party/OpenMeteo.js";
class Place {
  static getEntityTypeName() {
    return "Place";
  }
  constructor({ latLng, openMeteoData }) {
    this.latLng = latLng;
    this.openMeteoData = openMeteoData;
  }

  get id() {
    return `place-${this.latLng.lat}-${this.latLng.lng}`;
  }

  get supertitle() {
    return this.constructor.getEntityTypeName();
  }

  get title() {
    return this.latLng.title;
  }

  get subtitle() {
    return `${this.elevation_m}m AMSL`;
  }

  get elevation_m() {
    return this.openMeteoData.elevation_m;
  }

  async loadDetails() {
    this.openMeteoData = await OpenMeteo.getData({ latLng: this.latLng });
    return this;
  }

  static async loadData({ latLng }) {
    return { latLng };
  }

  static async load({ latLng }) {
    const data = await this.loadData({ latLng });
    return new Place(data);
  }
}

export default Place;
