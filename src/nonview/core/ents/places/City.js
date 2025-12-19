import Place from "./Place.js";
import WithLoadAllStaticMixin from "../../../base/mixins/WithLoadAllStaticMixin.js";
import WithDataStaticStaticMixin from "../../../base/mixins/WithDataStaticStaticMixin.js";
import LatLng from "../../../base/geos/LatLng.js";
import WithNameMixin from "../../../base/mixins/WithNameMixin.js";

class City extends Place {
  static getEntTypeName() {
    return "Town/City";
  }

  get title() {
    return this.name;
  }

  get subtitle() {
    return "";
  }

  get url() {
    return `/City/${this.getNameId()}`;
  }

  static getStaticDataID() {
    return "cities";
  }

  constructor(data) {
    super(data);
    this.name = data.name;
  }

  static async loadAll() {
    const rawDataList = await this.getRawDataList();
    return await Promise.all(
      rawDataList.map(async (rawData) => {
        const latLng = LatLng.fromRaw(rawData.latLng || rawData.lat_lng);
        const placeData = await Place.loadData({
          latLng,
        });
        return new City({ ...rawData, ...placeData });
      })
    );
  }

  static getMajorCityNames() {
    return [
      // Province capitals
      "Colombo",
      "Kandy",
      "Galle",
      "Jaffna",
      "Trincomalee",
      "Kurunegala",
      "Badulla",
      "Ratnapura",

      // District capitals
      "Gampaha",
      "Kalutara",
      "Matale",
      "Nuwara Eliya",
      "Matara",
      "Hambantota",
      "Kilinochchi",
      "Mannar",
      "Vavuniya",
      "Mullaitivu",
      "Batticaloa",
      "Ampara",
      "Puttalam",
      "Anuradhapura",
      "Polonnaruwa",
      "Monaragala",
      "Kegalle",

      // Additional major cities
      "Negombo",
      "Moratuwa",
      "Matara",
      "Kalmunai",
    ];
  }

  static async loadAllMajor() {
    const cityList = await this.loadAll();
    const majorCityNames = this.getMajorCityNames();
    return cityList.filter((city) => majorCityNames.includes(city.name));
  }
}

Object.assign(City, WithDataStaticStaticMixin);
Object.assign(City, WithLoadAllStaticMixin);
Object.assign(City.prototype, WithNameMixin);

export default City;
