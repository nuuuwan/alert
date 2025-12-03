import { Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function RegionView({ region, pathOptions }) {
  const [lngLatListList, setLngLatListList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (region) {
        const lngLatListList2 = await region.getLngLatListList();
        setLngLatListList(lngLatListList2);
      }
    }
    fetchData();
  }, [region]);

  if (!lngLatListList || lngLatListList.length === 0) {
    return null;
  }

  return (
    <>
      {lngLatListList.map((lngLatList, index) => (
        <Polygon
          key={`${region.id}-lngLatList-${index}`}
          positions={lngLatList}
          pathOptions={pathOptions}
        >
          <Popup>
            <Box sx={{ minWidth: 200, p: 1 }}>
              <Typography variant="h6" gutterBottom>
                {region.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>ID:</strong> {region.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Type:</strong> {region.entType}
              </Typography>
            </Box>
          </Popup>
        </Polygon>
      ))}
    </>
  );
}
