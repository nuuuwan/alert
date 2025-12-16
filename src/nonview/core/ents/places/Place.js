import OpenMeteo from "../../third_party/OpenMeteo.js";
import OpenElevation from "../../third_party/OpenElevation.js";
import OpenMeteoFlood from "../../third_party/OpenMeteoFlood.js";
import Earthquake from "../../third_party/Earthquake.js";
import DSD from "../../ents/regions/admin_regions/DSD.js";
import District from "../../ents/regions/admin_regions/District.js";
import Province from "../../ents/regions/admin_regions/Province.js";
class Place {
  static getEntTypeName() {
    return "Point Location";
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
    const [
      openMeteoData,
      openMeteoFloodData,
      openElevationData,
      earthquakeData,
      dsd,
    ] = await Promise.all([
      OpenMeteo.getData({ latLng: this.latLng }),
      OpenMeteoFlood.getData(this.latLng),
      OpenElevation.getData(this.latLng),
      Earthquake.loadAllRecent(),
      DSD.loadNearest(this.latLng),
    ]);

    this.openMeteoData = openMeteoData;
    this.openMeteoFloodData = openMeteoFloodData;
    this.openElevationData = openElevationData;
    this.earthquakeData = earthquakeData;

    this.dsd = dsd;
    this.dsd = await this.dsd.loadLandslideWarningData();

    const [district, province] = await Promise.all([
      District.loadFromId(this.dsd.districtId),
      Province.loadFromId(this.dsd.provinceId),
    ]);

    this.district = district;
    this.province = province;

    return this;
  }

  static async loadData({ latLng }) {
    return { latLng };
  }

  static async load({ latLng }) {
    const data = await this.loadData({ latLng });
    return new Place(data);
  }

  static fromLatLng(latLng) {
    return new Place({ latLng, openMeteoData: undefined });
  }

  get landslideWarningLevel() {
    return (this.dsd && this.dsd.latestLandslideWarningLevel) || 0;
  }

  get officialAlertLevel() {
    return this.landslideWarningLevel;
  }

  get autoAlertLevel() {
    return 0;
  }

  get alertLevel() {
    return Math.max(this.officialAlertLevel, this.autoAlertLevel);
  }

  static dedupeByLatLng(places) {
    return Object.values(
      Object.fromEntries(places.map((place) => [place.latLng.id, place])),
    );
  }
}

export default Place;
