import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import SourceView from "../atoms/SourceView";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;
  const currentTemp = openMeteoData.temp_2m_c[0].toFixed(1);
  const currentRain = openMeteoData.rain_mm[0].toFixed(1);

  const [latitude, longitude] = latLng.toArray();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weather
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
          icon={ThermostatIcon}
          label="Temperature"
          value={currentTemp}
          unit="°C"
        />

        <MetricCard
          icon={WaterDropIcon}
          label="Rain"
          value={currentRain}
          unit="mm"
        />
      </Box>

      <SourceView
        label="Open-Meteo (Real-Time Weather API)"
        url={`https://open-meteo.com/en/docs?latitude=${latitude}&longitude=${longitude}`}
      />
    </Box>
  );
}
