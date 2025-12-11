import OpenMeteo from "../../third_party/OpenMeteo.js";
import OpenElevation from "../../third_party/OpenElevation.js";
import OpenMeteoFlood from "../../third_party/OpenMeteoFlood.js";
class Place {
  static getEntTypeName() {
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
    return this.constructor.getEntTypeName();
  }

  get title() {
    return this.latLng.title;
  }

  get subtitle() {
    return "";
  }

  get url() {
    return `/Place/${this.latLng.id}`;
  }

  async loadDetails() {
    this.openMeteoData = await OpenMeteo.getData({ latLng: this.latLng });
    this.openMeteoFloodData = await OpenMeteoFlood.getData(this.latLng);
    this.openElevationData = await OpenElevation.getData(this.latLng);
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
