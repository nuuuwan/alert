import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import OldMetricCardCollection from "./OldMetricCardCollection";
export default function SatelliteImageView({ place }) {
  const { latLng, name } = place;
  const latLngToWebMercator = (lat, lng) => {
    const x = (lng * 20037508.34) / 180;
    const y =
      (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) *
      (20037508.34 / 180);
    return { x, y };
  };

  const [lat, lng] = latLng.raw();
  const center = latLngToWebMercator(lat, lng);

  const bufferMeters = 1000;
  const minX = center.x - bufferMeters;
  const minY = center.y - bufferMeters;
  const maxX = center.x + bufferMeters;
  const maxY = center.y + bufferMeters;

  const satelliteImageUrl = `https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer/exportImage?f=image&bbox=${minX},${minY},${maxX},${maxY}&bboxSR=102100&imageSR=102100&size=400,400&compressionQuality=75&format=jpgpng`;

  const [loading, setLoading] = useState(true);

  return (
    <OldMetricCardCollection
      title="Satellite Image"
      sourceList={[
        {
          label: "European Space Agency (ESA) Sentinel-2",
          url: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2",
        },
      ]}
    >
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 0,
            paddingTop: "100%" /* Maintain aspect ratio */,
            position: "relative",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        component="img"
        src={satelliteImageUrl}
        alt={`Satellite view of ${name}`}
        crossOrigin="anonymous"
        onLoad={() => setLoading(false)}
        sx={{
          display: loading ? "none" : "block",
          width: "100%",
          height: "auto",
          aspectRatio: "1",
          objectFit: "cover",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      />
    </OldMetricCardCollection>
  );
}
