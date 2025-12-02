import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";

export default function MapStationView({
  stations,
  stationToLatest,
  stationToAlert,
}) {
  return (
    <>
      {stations.map((station, index) => {
        const alert = stationToAlert[station.name];
        const fillColor = alert ? alert.colorRgb : "white";
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
              const alertColor = alert.colorRgb;

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
                  <Typography variant="h4" component="h1" gutterBottom>
                    {station.name}
                  </Typography>
                  <Typography variant="body1" component="h1" gutterBottom>
                    Gauging Station
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

                  <Divider sx={{ my: 3 }} />

                  <WaterLevelChart station={station} />
                </Box>
              );
            }}
          />
        );
      })}
    </>
  );
}
