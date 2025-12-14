import MetricCard from "../atoms/MetricCard";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import Elevation from "../../nonview/core/units/Elevation";
import Slope from "../../nonview/core/units/Slope";
import RelativeElevation from "../../nonview/core/units/RelativeElevation";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <OldMetricCardCollection
      title="Terrain Metrics"
      sourceList={OpenElevation.getSourceList()}
    >
      <MetricCard
        unitValue={new Elevation(openElevationData.elevationM)}
        timeLabel=""
      />
      <MetricCard
        unitValue={new Slope(openElevationData.slopeData.maxSlopeAngle)}
        timeLabel=""
      />
      <MetricCard
        unitValue={
          new RelativeElevation(
            openElevationData.relativeElevationData.relativeElevation
          )
        }
        timeLabel=""
      />
    </OldMetricCardCollection>
  );
}
