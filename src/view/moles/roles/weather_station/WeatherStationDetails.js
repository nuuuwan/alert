import Box from "@mui/material/Box";
import { RainfallView, TemperatureView } from "../../../atoms";

export default function WeatherStationDetails({ latestEvent, isStale = false }) {
  if (!latestEvent) {
    return null;
  }

  const latestReport = latestEvent;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mb: 2,
        }}
      >
        <RainfallView rainMM={latestReport.rainMM} isStale={isStale} />
        <TemperatureView
          tempMin={latestReport.tempMinC}
          tempMax={latestReport.tempMaxC}
          isStale={isStale}
        />
      </Box>
    </Box>
  );
}
