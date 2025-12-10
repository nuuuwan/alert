import Place from "../../ents/places/Place.js";
export default class Region {
  static getEntTypeName() {
    return "Region";
  }
  constructor({ multiPolygon }) {
    this.multiPolygon = multiPolygon;
  }

  getCentroidLatLng() {
    return this.multiPolygon.getCentroid();
  }

  async loadCentroidPlace() {
    const centroidLatLng = this.getCentroidLatLng();
    const centroidPlace = await Place.load({ latLng: centroidLatLng });
    return centroidPlace;
  }

  get latLng() {
    return this.getCentroidLatLng();
  }
}
