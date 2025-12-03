import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SatelliteImageView({ latLng, name }) {
  const latLngToWebMercator = (lat, lng) => {
    const x = (lng * 20037508.34) / 180;
    const y =
      (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) *
      (20037508.34 / 180);
    return { x, y };
  };

  const [lat, lng] = latLng;
  const center = latLngToWebMercator(lat, lng);

  const bufferMeters = 2000;
  const minX = center.x - bufferMeters;
  const minY = center.y - bufferMeters;
  const maxX = center.x + bufferMeters;
  const maxY = center.y + bufferMeters;

  const satelliteImageUrl = `https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer/exportImage?f=image&bbox=${minX},${minY},${maxX},${maxY}&bboxSR=102100&imageSR=102100&size=400,400&compressionQuality=75&format=jpgpng`;

  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ textTransform: "uppercase" }}
      >
        Satellite View
      </Typography>
      <Box
        component="img"
        src={satelliteImageUrl}
        alt={`Satellite view of ${name}`}
        crossOrigin="anonymous"
        sx={{
          width: "100%",
          height: "auto",
          aspectRatio: "1",
          objectFit: "cover",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      />
      <Typography variant="caption" color="text.secondary">
        Source: European Space Agency (ESA) Sentinel-1
      </Typography>
    </Box>
  );
}
