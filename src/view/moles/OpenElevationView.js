import OldMetricCard from "../atoms/OldMetricCard";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import TerrainIcon from "@mui/icons-material/Terrain";
import { COLORS } from "../_cons/StyleConstants";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <OldMetricCardCollection
      title="Terrain Metrics"
      sourceList={OpenElevation.getSourceList()}
    >
      <OldMetricCard
        Icon={TerrainIcon}
        label="Elevation"
        value={openElevationData.elevationM.toFixed(1)}
        unit="m"
        color={COLORS.earth}
      />
      <OldMetricCard
        Icon={TerrainIcon}
        label="Max Slope Angle"
        value={openElevationData.slopeData.slopeAngle.toFixed(0)}
        unit="°"
        alertLabel=""
        color={COLORS.earth}
      />
      <OldMetricCard
        Icon={TerrainIcon}
        label="Relative Elevation"
        value={openElevationData.relativeElevationData.relativeElevation.toFixed(
          0
        )}
        unit="m"
        alertLabel=""
        color={COLORS.earth}
      />
    </OldMetricCardCollection>
  );
}
