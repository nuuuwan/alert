import Grid from "@mui/material/Grid";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OldMetricCard from "../atoms/OldMetricCard";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import RainChart from "./RainChart";
import TempChart from "./TempChart";
import OpacityIcon from "@mui/icons-material/Opacity";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import CloudIcon from "@mui/icons-material/Cloud";
import { COLORS } from "../_cons/StyleConstants";
import MetricCard from "../atoms/MetricCard";
import Temperature from "../../nonview/core/units/Temperature";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;
  console.debug({ openMeteoData });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <OldMetricCardCollection
          title="Weather Forecast"
          sourceList={OpenMeteo.getSourceList(latLng)}
        >
          <MetricCard
            unitValue={new Temperature(openMeteoData.maxTempNext24Hours)}
            timeLabel="Next 24h"
          />
          <OldMetricCard
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
        </OldMetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <OldMetricCardCollection
          title="Current Weather"
          sourceList={OpenMeteo.getSourceList(latLng)}
        >
          <OldMetricCard
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
          <OldMetricCard
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
          <OldMetricCard
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
          <OldMetricCard
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
        </OldMetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <RainChart
          hourlyRain={openMeteoData.hourlyRain}
          hourlyTimeUt={openMeteoData.hourlyTimeUt}
          latLng={place.latLng}
        />
      </Grid>
      <Grid item xs={12}>
        <TempChart
          hourlyTemp={openMeteoData.hourlyTemp}
          hourlyTimeUt={openMeteoData.hourlyTimeUt}
          latLng={place.latLng}
        />
      </Grid>
    </Grid>
  );
}
