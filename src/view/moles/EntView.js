import { Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
        >
          <Popup>
            <Box sx={{ minWidth: 200, p: 1 }}>
              <Typography variant="h6" gutterBottom>
                {ent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>ID:</strong> {ent.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Type:</strong> {ent.entType}
              </Typography>
            </Box>
          </Popup>
        </Polygon>
      ))}
    </>
  );
}
