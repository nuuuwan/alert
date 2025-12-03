import { Polygon, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";

export default function RegionView({ regionId, pathOptions }) {
  const [region, setRegion] = useState(null);
  const [latLngListList, setLatLngListList] = useState([]);

  useEffect(() => {
    async function fetchRegion() {
      const region2 = await DSD.fromID(regionId);
      setRegion(region2);
    }
    fetchRegion();
  }, [regionId]);

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
