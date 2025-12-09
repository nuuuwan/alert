import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import SourceView from "../atoms/SourceView";
import TimeUtils from "../../nonview/base/TimeUtils";
import RainChart from "../atoms/RainChart";
import TempChart from "../atoms/TempChart";
import OpacityIcon from "@mui/icons-material/Opacity";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  const [latitude, longitude] = latLng.raw();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weather
      </Typography>

      <MetricCardCollection>
        <MetricCard
          Icon={WaterDropIcon}
          label="Rain"
          value={openMeteoData.hourlyRainSumLast24Hours.toFixed(0)}
          unit="mm"
          timeLabel="24h total"
        />
        <MetricCard
          Icon={ThermostatIcon}
          label="Temp"
          value={openMeteoData.currentTempCelsius.toFixed(1)}
          unit="°C"
          timeLabel={TimeUtils.getTimeAgoString(openMeteoData.currentTimeUt)}
        />
        <MetricCard
          Icon={OpacityIcon}
          label="RH"
          value={openMeteoData.currentRH.toFixed(0)}
          unit="%"
          timeLabel={TimeUtils.getTimeAgoString(openMeteoData.currentTimeUt)}
        />
        <MetricCard
          Icon={WaterDropIcon}
          label="For. Rain"
          value={openMeteoData.hourlyRainHourCountNext24Hours.toFixed(0)}
          unit="mm"
          timeLabel="Next 24h total"
          isPrediction
        />
      </MetricCardCollection>

      <RainChart
        hourlyRain={openMeteoData.hourlyRain}
        hourlyTimeUt={openMeteoData.hourlyTimeUt}
      />
      <TempChart
        hourlyTemp={openMeteoData.hourlyTemp}
        hourlyTimeUt={openMeteoData.hourlyTimeUt}
      />

      <SourceView
        label="Open-Meteo (Real-Time Weather API)"
        url={`https://open-meteo.com/en/docs?latitude=${latitude}&longitude=${longitude}`}
      />
    </Box>
  );
}
