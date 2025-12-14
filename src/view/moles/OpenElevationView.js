import MetricCard from "../atoms/MetricCard";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import { newTimedUnit } from "../../nonview/core/units/TimedUnit";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <OldMetricCardCollection
      title="Terrain Metrics"
      dataSourceList={[OpenElevation.getDataSource()]}
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
    </OldMetricCardCollection>
  );
}
