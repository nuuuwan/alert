import MetricCard from "../atoms/MetricCard";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import Elevation from "../../nonview/core/units/Elevation";
import Slope from "../../nonview/core/units/Slope";
import RelativeElevation from "../../nonview/core/units/RelativeElevation";
import TimedUnit from "../../nonview/core/units/TimedUnit";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <OldMetricCardCollection
      title="Terrain Metrics"
      sourceList={OpenElevation.getSourceList()}
    >
      <MetricCard
        timedUnitValue={
          new TimedUnit({
            timeLabel: "",
            unitValue: new Elevation(openElevationData.elevationM),
          })
        }
      />
      <MetricCard
        timedUnitValue={
          new TimedUnit({
            timeLabel: "",
            unitValue: new Slope(openElevationData.slopeData.maxSlopeAngle),
          })
        }
      />
      <MetricCard
        timedUnitValue={
          new TimedUnit({
            timeLabel: "",
            unitValue: new RelativeElevation(
              openElevationData.relativeElevationData.relativeElevation
            ),
          })
        }
      />
    </OldMetricCardCollection>
  );
}
