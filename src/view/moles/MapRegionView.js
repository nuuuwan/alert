import { Polygon } from "react-leaflet";
import L from "leaflet";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";

export default function MapRegionView({ region, onClick }) {
  let regionColor = "lightgray";
  if (region instanceof DSD) {
    const dsd = region;
    const latestLandslideWarningLevel = dsd.latestLandslideWarningLevel;
    regionColor =
      {
        1: "yellow",
        2: "orange",
        3: "red",
      }[latestLandslideWarningLevel] || "lightgray";
  }

  const onClickInner = (e) => {
    L.DomEvent.stopPropagation(e);
    onClick(region, e);
  };

  return (
    <>
      {region.multiPolygon.raw().map((rawPolygon, index) => (
        <Polygon
          key={`${region.id}-latLngList-${index}`}
          positions={rawPolygon}
          pathOptions={{
            fill: true,
            fillColor: regionColor,
            color: "white",
            weight: 2,
          }}
          eventHandlers={{
            click: onClickInner,
          }}
        />
      ))}
    </>
  );
}
