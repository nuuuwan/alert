import { Polygon } from "react-leaflet";
import L from "leaflet";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import { useNavigate } from "react-router-dom";

export default function MapRegionView({ region, onClick }) {
  const navigate = useNavigate();
  let color = COLORS.neutral;
  if (region instanceof DSD) {
    const dsd = region;

    color = getAlertColor(dsd.latestLandslideWarningLevel);
  }

  const onClickInner = (e) => {
    L.DomEvent.stopPropagation(e);
    navigate(`/DSD/${region.id}`);
  };

  return (
    <>
      {region.multiPolygon.raw().map((rawPolygon, index) => (
        <Polygon
          key={`${region.id}-latLngList-${index}`}
          positions={rawPolygon}
          pathOptions={{
            fillColor: color,
            color: "white",
            weight: 0.5,
            fillOpacity: 0.667,
          }}
          eventHandlers={{
            click: onClickInner,
          }}
        />
      ))}
    </>
  );
}
