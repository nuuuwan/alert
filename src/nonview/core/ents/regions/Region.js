import Place from "../../ents/places/Place.js";
import MultiPolygon from "../../../base/geos/MultiPolygon.js";
export default class Region {
  static getEntTypeName() {
    return "Region";
  }
  constructor({ multiPolygon, topoJSON }) {
    this.topoJSON = topoJSON;
    this.multiPolygon =
      multiPolygon ?? (topoJSON ? MultiPolygon.fromGeoJSON(topoJSON) : null);
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

  isInside(latLng) {
    return this.multiPolygon.isInside(latLng);
  }
}
