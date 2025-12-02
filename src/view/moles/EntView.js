import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";

export default function EntView({ ent, pathOptions }) {
  const [lngLatListList, setlngLatListList] = useState([]);

  useEffect(() => {
    if (ent) {
      ent.getlngLatListList().then((data) => {
        setlngLatListList(data);
      });
    }
  }, [ent]);

  if (!lngLatListList || lngLatListList.length === 0) {
    return null;
  }

  return (
    <>
      {lngLatListList.map((lngLatList, index) => (
        <Polygon
          key={`${ent.id}-lngLatList-${index}`}
          positions={lngLatList}
          pathOptions={pathOptions}
        />
      ))}
    </>
  );
}
