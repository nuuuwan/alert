import Grid from "@mui/material/Grid";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import RainChart from "../atoms/RainChart";
import TempChart from "../atoms/TempChart";
import OpacityIcon from "@mui/icons-material/Opacity";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import CloudIcon from "@mui/icons-material/Cloud";
import { COLORS } from "../_cons/StyleConstants";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MetricCardCollection
          title="Weather Forecast"
          sourceList={OpenMeteo.getSourceList(latLng)}
        >
          <MetricCard
            Icon={ThermostatIcon}
            label="Max Temp"
            value={openMeteoData.maxTempNext24Hours.toFixed(1)}
            unit="°C"
            timeLabel="Next 24h"
            color={COLORS.fire}
            xs={6}
            sm={6}
            md={6}
          />
          <MetricCard
            Icon={WaterDropIcon}
            label="Rain"
            value={openMeteoData.hourlyRainSumNext24Hours.toFixed(0)}
            unit="mm"
            timeLabel="Next 24h total"
            color={COLORS.water}
            xs={6}
            sm={6}
            md={6}
          />
        </MetricCardCollection>
      </Grid>
      <Grid item xs={12}>
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
            color={COLORS.water}
            xs={6}
            sm={6}
            md={3}
          />
          <MetricCard
            Icon={ThermostatIcon}
            label="Temp"
            value={openMeteoData.currentTempCelsius.toFixed(1)}
            unit="°C"
            timeLabel={"Now"}
            color={COLORS.fire}
            xs={6}
            sm={6}
            md={3}
          />
          <MetricCard
            Icon={OpacityIcon}
            label="Relative Humidity"
            value={openMeteoData.currentRH.toFixed(0)}
            unit="%"
            timeLabel={"Now"}
            color={COLORS.air}
            xs={6}
            sm={6}
            md={3}
          />
          <MetricCard
            Icon={CloudIcon}
            label="Dew Point"
            value={openMeteoData.hourlyDewPoint[7 * 24].toFixed(1)}
            unit="°C"
            timeLabel={"Now"}
            color={COLORS.fire}
            xs={6}
            sm={6}
            md={3}
          />
        </MetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <RainChart
          hourlyRain={openMeteoData.hourlyRain}
          hourlyTimeUt={openMeteoData.hourlyTimeUt}
        />
      </Grid>
      <Grid item xs={12}>
        <TempChart
          hourlyTemp={openMeteoData.hourlyTemp}
          hourlyTimeUt={openMeteoData.hourlyTimeUt}
        />
      </Grid>
    </Grid>
  );
}
