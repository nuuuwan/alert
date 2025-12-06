import { Polygon } from "react-leaflet";

export default function MapRegionView({ region, onClick, regionColor }) {
  return (
    <>
      {region.multiPolygon.raw().map((rawPolygon, index) => (
        <Polygon
          key={`${region.id}-latLngList-${index}`}
          positions={rawPolygon}
          pathOptions={{
            fill: true,
            fillColor: regionColor || "lightgrey",
            color: "white",
            weight: 2,
          }}
          evregionHandlers={{
            click: onClick,
          }}
        />
      ))}
    </>
  );
}
