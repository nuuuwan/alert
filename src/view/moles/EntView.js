import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";

export default function EntView({ ent, pathOptions }) {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    if (ent) {
      ent.getGeo().then((data) => {
        setGeoData(data);
      });
    }
  }, [ent]);

  if (!geoData || geoData.length === 0) {
    return null;
  }

  return (
    <>
      {geoData.map((polygonCoords, index) => (
        <Polygon
          key={`${ent.id}-polygon-${index}`}
          positions={polygonCoords}
          pathOptions={pathOptions}
        />
      ))}
    </>
  );
}
