import OpenMeteo from "../../third_party/OpenMeteo.js";
import OpenElevation from "../../third_party/OpenElevation.js";
import OpenMeteoFlood from "../../third_party/OpenMeteoFlood.js";
import Earthquake from "../../third_party/Earthquake.js";
import DSD from "../../ents/regions/admin_regions/DSD.js";
import District from "../../ents/regions/admin_regions/District.js";
import Province from "../../ents/regions/admin_regions/Province.js";
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
    this.earthquakeData = await Earthquake.loadAllRecent();
    this.dsd = await DSD.loadNearest(this.latLng);
    this.district = await District.loadFromId(this.dsd.districtId);
    this.province = await Province.loadFromId(this.dsd.provinceId);
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
