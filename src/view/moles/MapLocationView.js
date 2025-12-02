import MapMarkerView from "./MapMarkerView";

export default function MapLocationView({ locations }) {
  return (
    <MapMarkerView
      items={locations}
      markerType="location"
      radius={0}
      pathOptions={{ color: "none", fillColor: "gray", fillOpacity: 1 }}
      labelStyle="color: #666;"
      renderPopupContent={(location) => null}
      formatLabel={(station) => ``}
    />
  );
}
