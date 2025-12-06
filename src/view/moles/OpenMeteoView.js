import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { COLORS } from "../_cons/StyleConstants";

export default function OpenMeteoView({ openMeteoData }) {
  const currentTemp = openMeteoData.temp_2m_c[0].toFixed(1);
  const currentRain = openMeteoData.rain_mm[0].toFixed(1);
  const MetricCard = ({ label, value, unit, icon: Icon }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.grayLight}`,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {Icon && <Icon fontSize="small" color="action" />}
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
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

      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 2 }}
      >
        Source: Open-Meteo (Real-Time Weather API)
      </Typography>
    </Box>
  );
}
