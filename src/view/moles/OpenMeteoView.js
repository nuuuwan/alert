import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import SourceView from "../atoms/SourceView";
import TimeUtils from "../../nonview/base/TimeUtils";
import RainChart from "../atoms/RainChart";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  const [latitude, longitude] = latLng.raw();
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
          value={openMeteoData.temp2mCNow.toFixed(1)}
          unit="°C"
          timeLabel={TimeUtils.getTimeAgoString(openMeteoData.temp2mCNowTimeUt)}
        />

        <MetricCard
          icon={WaterDropIcon}
          label="Rain"
          value={openMeteoData.rainMMMean24h.toFixed(0)}
          unit="mm"
          timeLabel="Mean (Last 24 hours)"
        />
      </Box>

      <RainChart
        rainMM24h={openMeteoData.rainMM24h}
        rainMM24hTimeUt={openMeteoData.rainMM24hTimeUt}
      />

      <SourceView
        label="Open-Meteo (Real-Time Weather API)"
        url={`https://open-meteo.com/en/docs?latitude=${latitude}&longitude=${longitude}`}
      />
    </Box>
  );
}
