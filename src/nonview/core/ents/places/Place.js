import OpenMeteo from "../../third_party/OpenMeteo.js";
class Place {
  constructor({ latLng, openMeteoData }) {
    this.latLng = latLng;
    this.openMeteoData = openMeteoData;
  }

  get title() {
    return this.latLng.title;
  }

  static async load({ latLng }) {
    const openMeteoData = await OpenMeteo.getData({ latLng });

    return new Place({ latLng, openMeteoData });
  }
}

export default Place;
