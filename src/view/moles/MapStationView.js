import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function MapStationView({
  stations,
  stationToLatest,
  stationToColor,
}) {
  return (
    <>
      {stations.map((station, index) => {
        const fillColor = stationToColor[station.name] || "white";
        return (
          <MapMarkerView
            key={`station-group-${index}`}
            items={[station]}
            markerType="station"
            radius={STATION_MARKER_RADIUS}
            pathOptions={{
              color: fillColor,
              fillColor: "white",
              fillOpacity: 1.0,
            }}
            labelStyle="color: #333; font-weight: 500;"
            formatLabel={(station) => `${station.name} Station`}
            renderPopupContent={(station) => {
              const latestLevel = stationToLatest[station.name];
              const alert = station.getAlert(latestLevel.waterLevelM);
              const [r, g, b] = alert.color;
              const alertColor = `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

              const date = latestLevel.date;
              const formattedDate = date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <Box>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    gutterBottom
                  >
                    {station.riverName}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {station.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {formattedDate}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ mt: 3, mb: 1 }}
                  >
                    {latestLevel.waterLevelM.toFixed(2)}m
                  </Typography>

                  <Chip
                    label={alert.label}
                    sx={{
                      mt: 2,
                      backgroundColor: alertColor,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              );
            }}
          />
        );
      })}
    </>
  );
}
