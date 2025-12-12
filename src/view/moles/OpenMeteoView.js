import Box from "@mui/material/Box";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import TimeUtils from "../../nonview/base/TimeUtils";
import RainChart from "../atoms/RainChart";
import TempChart from "../atoms/TempChart";
import OpacityIcon from "@mui/icons-material/Opacity";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import CloudIcon from "@mui/icons-material/Cloud";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <MetricCardCollection
        title="Weather Forecast"
        sourceList={OpenMeteo.getSourceList(latLng)}
      >
        <MetricCard
          Icon={WaterDropIcon}
          label="Rain"
          value={openMeteoData.hourlyRainSumNext24Hours.toFixed(0)}
          unit="mm"
          timeLabel="Next 24h total"
        />
      </MetricCardCollection>
      <MetricCardCollection
        title="Current Weather"
        sourceList={OpenMeteo.getSourceList(latLng)}
      >
        <MetricCard
          Icon={WaterDropIcon}
          label="Rain"
          value={openMeteoData.hourlyRainSumLast24Hours.toFixed(0)}
          unit="mm"
          timeLabel="Last 24h total"
        />
        <MetricCard
          Icon={ThermostatIcon}
          label="Temp"
          value={openMeteoData.currentTempCelsius.toFixed(1)}
          unit="°C"
          timeLabel={"Now"}
        />
        <MetricCard
          Icon={OpacityIcon}
          label="RH"
          value={openMeteoData.currentRH.toFixed(0)}
          unit="%"
          timeLabel={"Now"}
        />
        <MetricCard
          Icon={CloudIcon}
          label="Dew Point"
          value={openMeteoData.hourlyDewPoint[7 * 24].toFixed(1)}
          unit="°C"
          timeLabel={"Now"}
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
    </Box>
  );
}
