import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";

export default function MapRegionView({ region, onClick, entColor }) {
  const [latLngListList, setLatLngListList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (region) {
        const latLngListList2 = await region.getLatLngListList();
        setLatLngListList(latLngListList2);
      }
    }
    fetchData();
  }, [region]);

  if (!latLngListList || latLngListList.length === 0) {
    return null;
  }

  return (
    <>
      {latLngListList.map((latLngList, index) => (
        <Polygon
          key={`${region.id}-latLngList-${index}`}
          positions={latLngList}
          pathOptions={{ fill: entColor }}
          eventHandlers={{
            click: onClick,
          }}
        />
      ))}
    </>
  );
}
