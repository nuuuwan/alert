import { GeoJSON } from "react-leaflet";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";

export default function MapRegionView({ region }) {
  let color = COLORS.neutral;
  if (region instanceof DSD) {
    const dsd = region;
    color = getAlertColor(dsd.latestLandslideWarningLevel, 3);
  }

  return (
    <GeoJSON
      key={region.id}
      data={region.topoJSON}
      pathOptions={{
        fillColor: color,
        color: "white",
        weight: 1,
        fillOpacity: 0.5,
      }}
    />
  );
}
