import MetricCard from "../atoms/MetricCard";
import InformationGroup from "../atoms/InformationGroup";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import { newTimedUnit } from "../../nonview/core/units/TimedUnit";
import LandscapeIcon from "@mui/icons-material/Landscape";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <InformationGroup
      title="Terrain Metrics"
      dataSourceList={[OpenElevation.getDataSource()]}
      Icon={LandscapeIcon}
    >
      <MetricCard
        timedUnitValue={newTimedUnit(openElevationData, "elevationM")}
      />
      <MetricCard
        timedUnitValue={newTimedUnit(openElevationData, "slopeMaxAngle")}
      />
      <MetricCard
        timedUnitValue={newTimedUnit(openElevationData, "relativeElevation")}
      />
    </InformationGroup>
  );
}
