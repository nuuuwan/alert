import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { RainfallView, TemperatureView, TimeAgoView } from "../atoms";
import WeatherReport from "../../nonview/core/events/WeatherReport";

export default function WeatherStationDetails({ place }) {
  const [loading, setLoading] = useState(true);
  const [latestReport, setLatestReport] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Load weather reports
        const reports = (await WeatherReport.listForId(place.id)).sort(
          (a, b) => a.timeUt - b.timeUt
        );

        if (reports.length > 0) {
          const latest = reports[reports.length - 1];
          setLatestReport(latest);
        }
      } catch (error) {
        console.error("Error loading weather station data:", error);
      }
      setLoading(false);
    }

    loadData();
  }, [place.id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!latestReport) {
    return null;
  }

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
        <RainfallView rainMM={latestReport.rainMM} />
        <TemperatureView
          tempMin={latestReport.tempMinC}
          tempMax={latestReport.tempMaxC}
        />
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <TimeAgoView date={latestReport.getDate()} variant="body2" />
      </Box>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
