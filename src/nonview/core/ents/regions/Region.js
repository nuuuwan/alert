import Place from "../../ents/places/Place.js";
export default class Region {
  static getEntTypeName() {
    return "Region";
  }
  constructor({ multiPolygon }) {
    this.multiPolygon = multiPolygon;
  }

  async loadCentroidPlace() {
    const centroidLatLng = this.multiPolygon.getCentroid();
    const centroidPlace = await Place.load({ latLng: centroidLatLng });
    return centroidPlace;
  }
}
