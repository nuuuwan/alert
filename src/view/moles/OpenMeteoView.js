import Grid from "@mui/material/Grid";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import MetricCard from "../atoms/MetricCard";
import Temperature from "../../nonview/core/units/Temperature";
import Rain from "../../nonview/core/units/Rain";
import RelativeHumidity from "../../nonview/core/units/RelativeHumidity";
import DewPoint from "../../nonview/core/units/DewPoint";
import RainChart from "../moles/RainChart";
import TempChart from "../moles/TempChart";

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
          <MetricCard
            unitValue={new Rain(openMeteoData.hourlyRainSumNext24Hours)}
            timeLabel="Next 24h total"
          />
        </OldMetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <OldMetricCardCollection
          title="Current Weather"
          sourceList={OpenMeteo.getSourceList(latLng)}
        >
          <MetricCard
            unitValue={new Rain(openMeteoData.hourlyRainSumLast24Hours)}
            timeLabel="Last 24h total"
          />
          <MetricCard
            unitValue={new Temperature(openMeteoData.currentTempCelsius)}
            timeLabel="Now"
          />
          <MetricCard
            unitValue={new RelativeHumidity(openMeteoData.currentRH)}
            timeLabel="Now"
          />
          <MetricCard
            unitValue={new DewPoint(openMeteoData.hourlyDewPoint[7 * 24])}
            timeLabel="Now"
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
