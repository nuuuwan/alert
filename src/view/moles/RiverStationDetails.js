import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { LineChart } from "@mui/x-charts/LineChart";
import WaterLevelView from "../atoms/WaterLevelView";
import RateOfRiseView from "../atoms/RateOfRiseView";
import { COLORS, CHART_COLORS } from "../_cons/StyleConstants";

export default function RiverStationDetails({ place }) {
  const [loading, setLoading] = useState(true);
  const [waterLevelHistory, setWaterLevelHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await place.loadWaterLevelHistory();
        setWaterLevelHistory(place.waterLevelHistory || []);
      } catch (error) {
        console.error("Error loading water level history:", error);
      }
      setLoading(false);
    }

    loadData();
  }, [place]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (waterLevelHistory.length === 0) {
    return null;
  }

  // Latest is first (descending order)
  const latestReading = waterLevelHistory[0];
  const previousReading = waterLevelHistory[1];

  // Calculate alert level
  const getAlert = (waterLevelM) => {
    if (waterLevelM >= place.majorFloodLevelM) {
      return { label: "Major Flood", colorRgb: COLORS.red };
    }
    if (waterLevelM >= place.minorFloodLevelM) {
      return { label: "Minor Flood", colorRgb: COLORS.orange };
    }
    if (waterLevelM >= place.alertLevelM) {
      return { label: "Alert", colorRgb: COLORS.orangeLight };
    }
    return { label: "Normal", colorRgb: COLORS.green };
  };

  const alert = getAlert(latestReading.waterLevelM);

  // Calculate rate of rise
  let waterLevelDiff = null;
  let timeDiffHours = null;

  if (previousReading) {
    waterLevelDiff = latestReading.waterLevelM - previousReading.waterLevelM;
    timeDiffHours = (latestReading.timeUt - previousReading.timeUt) / 3600;
  }

  // Prepare chart data (reverse to show oldest to newest)
  const chartData = [...waterLevelHistory].reverse().slice(-168); // Last 7 days
  const xAxisData = chartData.map((d) => new Date(d.timeUt * 1000));
  const yAxisData = chartData.map((d) => d.waterLevelM);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        River Water Level
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mb: 2,
        }}
      >
        <WaterLevelView waterLevelM={latestReading.waterLevelM} alert={alert} />
        {waterLevelDiff !== null && timeDiffHours !== null && (
          <RateOfRiseView
            waterLevelDiff={waterLevelDiff}
            timeDiffHours={timeDiffHours}
          />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          7-Day History
        </Typography>
        <LineChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: "time",
              tickLabelStyle: {
                angle: 45,
                textAnchor: "start",
                fontSize: 10,
              },
            },
          ]}
          yAxis={[
            {
              label: "Water Level (m)",
              valueFormatter: (value) => `${value.toFixed(2)}m`,
            },
          ]}
          series={[
            {
              data: yAxisData,
              label: "Water Level",
              color: CHART_COLORS.waterLevel,
              showMark: false,
            },
          ]}
          height={450}
          margin={{ top: 20, right: 20, bottom: 100, left: 80 }}
        />
      </Box>
    </Box>
  );
}
