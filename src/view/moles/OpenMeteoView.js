import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TerrainIcon from "@mui/icons-material/Terrain";
import MetricCard from "../atoms/MetricCard";
import SourceView from "../atoms/SourceView";
import TimeUtils from "../../nonview/base/TimeUtils";
import RainChart from "../atoms/RainChart";
import TempChart from "../atoms/TempChart";
import ElevationWidget from "../atoms/ElevationWidget";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  const [latitude, longitude] = latLng.raw();
  return (
    <Box sx={{ p: 2 }}>
      <ElevationWidget elevationM={openMeteoData.elevationM} />
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
          Icon={WaterDropIcon}
          label="Rain"
          value={openMeteoData.rainMMSum24h.toFixed(0)}
          unit="mm"
          timeLabel="24 Hour sum"
        />
        <MetricCard
          Icon={ThermostatIcon}
          label="Temperature"
          value={openMeteoData.temp2mCNow.toFixed(1)}
          unit="°C"
          timeLabel={TimeUtils.getTimeAgoString(openMeteoData.temp2mCNowTimeUt)}
        />
      </Box>

      <RainChart
        rainMM24h={openMeteoData.rainMM24h}
        hourlyTimeUt={openMeteoData.hourlyTimeUt}
      />
      <TempChart
        temp2mC24h={openMeteoData.temp2mC24h}
        hourlyTimeUt={openMeteoData.hourlyTimeUt}
      />

      <SourceView
        label="Open-Meteo (Real-Time Weather API)"
        url={`https://open-meteo.com/en/docs?latitude=${latitude}&longitude=${longitude}`}
      />
    </Box>
  );
}
