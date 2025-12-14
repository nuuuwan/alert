import Grid from "@mui/material/Grid";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import MetricCard from "../atoms/MetricCard";
import Temperature from "../../nonview/core/units/Temperature";
import Rain from "../../nonview/core/units/Rain";
import RelativeHumidity from "../../nonview/core/units/RelativeHumidity";
import DewPoint from "../../nonview/core/units/DewPoint";
import TimedUnit from "../../nonview/core/units/TimedUnit";
import RainChart from "../moles/RainChart";
import TempChart from "../moles/TempChart";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <OldMetricCardCollection
          title="Weather Forecast"
          dataSourceList={[OpenMeteo.getDataSource(latLng)]}
        >
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Next 24h sum",
                unitValue: new Rain(openMeteoData.rainNext24hSum),
              })
            }
          />
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Next 24h max",
                unitValue: new Temperature(openMeteoData.tempNext24hMax),
              })
            }
          />
        </OldMetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <OldMetricCardCollection
          title="Current Weather"
          dataSourceList={[OpenMeteo.getDataSource(latLng)]}
        >
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Last 24h sum",
                unitValue: new Rain(openMeteoData.rainPrev24hSum),
              })
            }
          />
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Now",
                unitValue: new Temperature(openMeteoData.currentTempCelsius),
              })
            }
          />
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Now",
                unitValue: new RelativeHumidity(openMeteoData.currentRH),
              })
            }
          />
          <MetricCard
            timedUnitValue={
              new TimedUnit({
                timeLabel: "Now",
                unitValue: new DewPoint(
                  openMeteoData.dewPointListHourly[7 * 24]
                ),
              })
            }
          />
        </OldMetricCardCollection>
      </Grid>
      <Grid item xs={12}>
        <RainChart
          rainListHourly={openMeteoData.rainListHourly}
          timeUtListHourly={openMeteoData.timeUtListHourly}
          latLng={place.latLng}
        />
      </Grid>
      <Grid item xs={12}>
        <TempChart
          tempListHourly={openMeteoData.tempListHourly}
          timeUtListHourly={openMeteoData.timeUtListHourly}
          latLng={place.latLng}
        />
      </Grid>
    </Grid>
  );
}
