import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { COLORS } from "../_cons/StyleConstants";

export default function OpenMeteoView({ latLng, name }) {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await OpenMeteo.getData({ latLng });
        setWeatherData(data);
      } catch (err) {
        console.error("Error loading OpenMeteo data:", err);
        setError(err.message);
      }
      setLoading(false);
    }

    if (latLng) {
      loadData();
    }
  }, [latLng]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, color: COLORS.red }}>
        <Typography variant="body2">
          Failed to load weather forecast: {error}
        </Typography>
      </Box>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { hourly, daily } = weatherData;

  // Get current hour data (first value in arrays)
  const currentTemp = hourly.temperature_2m[0]?.toFixed(1);
  const currentHumidity = hourly.relative_humidity_2m[0]?.toFixed(0);
  const currentRain = hourly.rain[0]?.toFixed(1);
  const currentWindSpeed = hourly.wind_speed_10m[0]?.toFixed(1);
  const currentVisibility = (hourly.visibility[0] / 1000)?.toFixed(1);
  const currentSoilMoisture = hourly.soil_moisture_0_to_1cm[0]?.toFixed(2);
  const uvIndexMax = daily.uv_index_max[0]?.toFixed(1);

  const MetricCard = ({ label, value, unit, icon }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.grayLight}`,
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary" display="block">
        {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", my: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {unit}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weather Forecast
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 2 }}
      >
        Powered by Open-Meteo
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        <MetricCard
          icon="🌡️"
          label="Temperature"
          value={currentTemp}
          unit="°C"
        />
        <MetricCard
          icon="💧"
          label="Humidity"
          value={currentHumidity}
          unit="%"
        />
        <MetricCard icon="🌧️" label="Rain" value={currentRain} unit="mm" />
        <MetricCard
          icon="💨"
          label="Wind Speed"
          value={currentWindSpeed}
          unit="km/h"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 2,
        }}
      >
        <MetricCard
          icon="👁️"
          label="Visibility"
          value={currentVisibility}
          unit="km"
        />
        <MetricCard icon="☀️" label="UV Index Max" value={uvIndexMax} unit="" />
        <MetricCard
          icon="🌱"
          label="Soil Moisture"
          value={currentSoilMoisture}
          unit="m³/m³"
        />
      </Box>
    </Box>
  );
}
