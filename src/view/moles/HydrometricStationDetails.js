import Grid from "@mui/material/Grid";
import WavesIcon from "@mui/icons-material/Waves";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import OldMetricCard from "../atoms/OldMetricCard";
import WaterLevelChart from "../atoms/WaterLevelChart";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import InformationGroup from "../atoms/InformationGroup";
import DataSource from "../../nonview/core/DataSource";
import { Alert } from "@mui/material";

export default function HydrometricStationDetails({ place }) {
  const waterLevelHistory = place.waterLevelHistory || [];
  if (waterLevelHistory.length === 0) {
    return <Alert severity="info">No water level data available.</Alert>;
  }

  const nObservations = 10;
  const latestReading = waterLevelHistory[0];
  const previousReading = waterLevelHistory[nObservations];
  let rateOfRiseTimeLabel = "";
  let rateOfChangeData = null;
  let color = COLORS.neutral;
  if (previousReading) {
    const waterLevelDiff =
      latestReading.waterLevelM - previousReading.waterLevelM;
    const timeDiffHours =
      (latestReading.timeUt - previousReading.timeUt) / 3600;
    const rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;
    const EPSILON = 1;

    let label, icon;
    if (rateOfChangeCmPerHr > EPSILON) {
      label = "Rising";
      icon = TrendingUpIcon;
    } else if (rateOfChangeCmPerHr < -EPSILON) {
      label = "Falling";
      icon = TrendingDownIcon;
    } else {
      label = "Steady";
      icon = TrendingFlatIcon;
    }
    color = getAlertColor(place.alertLevel);

    const formattedValue = `${
      rateOfChangeCmPerHr > 0 ? "+" : ""
    }${rateOfChangeCmPerHr.toFixed(1)}`;
    rateOfChangeData = { value: formattedValue, label, color, icon };

    rateOfRiseTimeLabel = `${timeDiffHours.toFixed(0)}h mean`;
  }

  const alertLevel =
    ["", "Flood Alert", "Minor Flood", "Major Flood"][place.alertLevel] ||
    "No Alert";

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12 }}>
        <InformationGroup
          title="Water Level Metrics"
          Icon={WavesIcon}
          dataSourceList={[
            new DataSource({
              label:
                "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
              url: "https://github.com/nuuuwan/lk_irrigation",
            }),
          ]}
        >
          <OldMetricCard
            Icon={WavesIcon}
            label="Water Level"
            value={latestReading.waterLevelM.toFixed(2)}
            unit="m"
            timeLabel={TimeUtils.getTimeAgoString(latestReading.timeUt)}
            alertLabel={alertLevel}
            color={COLORS.water}
          />
          {rateOfChangeData && (
            <OldMetricCard
              Icon={rateOfChangeData.icon}
              label="Rate of Rise/Drop"
              value={rateOfChangeData.value}
              unit="cm/hr"
              timeLabel={rateOfRiseTimeLabel}
              color={COLORS.water}
            />
          )}
        </InformationGroup>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <WaterLevelChart
          waterLevelHistory={waterLevelHistory}
          HydrometricStation={place}
        />
      </Grid>
    </Grid>
  );
}
