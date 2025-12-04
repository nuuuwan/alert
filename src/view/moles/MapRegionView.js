import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";

export default function MapRegionView({ ent, onClick, entColor }) {
  const [latLngListList, setLatLngListList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (ent) {
        const latLngListList2 = await ent.getLatLngListList();
        setLatLngListList(latLngListList2);
      }
    }
    fetchData();
  }, [ent]);

  if (!latLngListList || latLngListList.length === 0) {
    return null;
  }

  return (
    <>
      {latLngListList.map((latLngList, index) => (
        <Polygon
          key={`${ent.id}-latLngList-${index}`}
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
