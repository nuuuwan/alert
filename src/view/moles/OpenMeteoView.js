import Grid from "@mui/material/Grid";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import InformationGroup from "../atoms/InformationGroup";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import OpenMeteoAirQuality from "../../nonview/core/third_party/OpenMeteoAirQuality";
import MetricCard from "../atoms/MetricCard";
import RainChart from "../moles/RainChart";
import TempChart from "../moles/TempChart";
import { newTimedUnit } from "../../nonview/core/units/TimedUnit";

export default function OpenMeteoView({ place }) {
  const { openMeteoData, latLng } = place;

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12 }}>
        <InformationGroup
          title="Weather Forecast"
          Icon={WbSunnyIcon}
          dataSourceList={[
            OpenMeteo.getDataSource(latLng),
            OpenMeteoAirQuality.getDataSource(),
          ]}
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
              "soilMoistureDeepNext24hMean",
            )}
          />
          <MetricCard
            timedUnitValue={newTimedUnit(place.airQualityData, "usAqiMax24h")}
          />
        </InformationGroup>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InformationGroup
          title="Current Weather"
          Icon={WbSunnyIcon}
          dataSourceList={[
            OpenMeteo.getDataSource(latLng),
            OpenMeteoAirQuality.getDataSource(),
          ]}
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
          <MetricCard
            timedUnitValue={newTimedUnit(place.airQualityData, "usAqiNow")}
          />
        </InformationGroup>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <RainChart
          rainListHourly={openMeteoData.rainListHourly}
          timeUtListHourly={openMeteoData.timeUtListHourly}
          latLng={place.latLng}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TempChart
          tempListHourly={openMeteoData.tempListHourly}
          timeUtListHourly={openMeteoData.timeUtListHourly}
          latLng={place.latLng}
        />
      </Grid>
    </Grid>
  );
}
