import Grid from "@mui/material/Grid";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import InformationGroup from "../atoms/InformationGroup";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import MetricCard from "../atoms/MetricCard";
import RainChart from "../moles/RainChart";
import TempChart from "../moles/TempChart";
import { newTimedUnit } from "../../nonview/core/units/TimedUnit";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <InformationGroup
          title="Weather Forecast"
          Icon={WbSunnyIcon}
          dataSourceList={[OpenMeteo.getDataSource(latLng)]}
        >
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "rainNext24hSum")}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "tempNext24hMin")}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "tempNext24hMax")}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "dewPointNext24hMax")}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(
              openMeteoData,
              "soilMoistureDeepNext24hMean"
            )}
          />
        </InformationGroup>
      </Grid>
      <Grid item xs={12}>
        <InformationGroup
          title="Current Weather"
          Icon={WbSunnyIcon}
          dataSourceList={[OpenMeteo.getDataSource(latLng)]}
        >
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "rainPrev24hSum")}
          />
          <MetricCard timedUnitValue={newTimedUnit(openMeteoData, "tempNow")} />
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "relativeHumidityNow")}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(openMeteoData, "dewPointNow")}
          />
        </InformationGroup>
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
