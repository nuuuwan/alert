import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import SourceView from "../atoms/SourceView";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;
  const temp2mC = openMeteoData.temp2mC.toFixed(1);
  const rain24hMM = openMeteoData.rain24hMM.toFixed(1);

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
          label="Temperature (Current)"
          value={temp2mC}
          unit="°C"
        />

        <MetricCard
          icon={WaterDropIcon}
          label="Rain (Last 24 hours)"
          value={rain24hMM}
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
