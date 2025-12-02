import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";

export default function StationDetails({
  station,
  stationToLatest,
  riverWaterLevelIdx,
}) {
  const latestLevel = stationToLatest[station.name];
  const alert = station.getAlert(latestLevel.waterLevelM);
  const alertColor = alert.colorRgb;

  const date = latestLevel.date;
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);

  // Convert lat/lng to Web Mercator (EPSG:3857) for Sentinel-2 image
  const latLngToWebMercator = (lat, lng) => {
    const x = (lng * 20037508.34) / 180;
    const y =
      (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) *
      (20037508.34 / 180);
    return { x, y };
  };

  const [lat, lng] = station.latLng;
  const center = latLngToWebMercator(lat, lng);

  // Create a bbox around the station (approximately 1km x 1km)
  const bufferMeters = 500; // 500m on each side
  const minX = center.x - bufferMeters;
  const minY = center.y - bufferMeters;
  const maxX = center.x + bufferMeters;
  const maxY = center.y + bufferMeters;

  const satelliteImageUrl = `https://sentinel.arcgis.com/arcgis/rest/services/Sentinel2/ImageServer/exportImage?f=image&bbox=${minX},${minY},${maxX},${maxY}&bboxSR=102100&imageSR=102100&size=400,400&compressionQuality=75&format=jpgpng`;

  // Compute rate of rise/drop
  let rateOfChangeCmPerHr = null;
  let rateChipLabel = null;
  let rateChipColor = null;

  const measurements = riverWaterLevelIdx[station.name];
  if (measurements && measurements.length >= 2) {
    const latest = measurements[measurements.length - 1];
    const secondLatest = measurements[measurements.length - 2];

    const waterLevelDiff = latest.waterLevelM - secondLatest.waterLevelM;
    const timeDiffHours = (latest.timeUt - secondLatest.timeUt) / 3600;

    if (timeDiffHours > 0) {
      rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;

      if (rateOfChangeCmPerHr > 0.01) {
        rateChipLabel = "Rising";
        rateChipColor = "rgb(211, 47, 47)"; // red
      } else if (rateOfChangeCmPerHr < -0.01) {
        rateChipLabel = "Falling";
        rateChipColor = "rgb(46, 125, 50)"; // green
      } else {
        rateChipLabel = "Steady";
        rateChipColor = "rgb(117, 117, 117)"; // grey
      }
    }
  }

  return (
    <Box>
      {/* Top Pane: Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="overline" color="text.secondary">
          {station.riverName}
        </Typography>
        <Typography variant="h5" component="h1">
          {station.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gauging Station • {formattedDate}
        </Typography>
      </Box>

      {/* Top Pane: Measurements and Satellite in Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Left: Measurements */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ textTransform: "uppercase" }}
            >
              Water Level
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 1 }}
            >
              <Typography variant="h3" component="span">
                {latestLevel.waterLevelM.toFixed(2)}
              </Typography>
              <Typography variant="h6" component="span" color="text.secondary">
                m
              </Typography>
            </Box>
            <Chip
              label={alert.label}
              sx={{
                backgroundColor: alertColor,
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>

          {rateChipLabel && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ textTransform: "uppercase" }}
              >
                Rate of Change
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <Typography variant="h5" component="span">
                  {rateOfChangeCmPerHr > 0 ? "+" : ""}
                  {rateOfChangeCmPerHr.toFixed(0)}
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  cm/hr
                </Typography>
              </Box>
              <Chip
                label={rateChipLabel}
                size="small"
                sx={{
                  backgroundColor: rateChipColor,
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Right: Satellite Image */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ textTransform: "uppercase", mb: 1 }}
          >
            Satellite View
          </Typography>
          <Box
            component="img"
            src={satelliteImageUrl}
            alt={`Satellite view of ${station.name}`}
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
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Bottom Pane: Chart */}
      <WaterLevelChart station={station} />

      <Box
        sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="caption" color="text.secondary">
          Data Source: Hydrology and Disaster Management Division, Irrigation
          Department of Sri Lanka.
        </Typography>
      </Box>
    </Box>
  );
}
