import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import TerrainIcon from "@mui/icons-material/Terrain";
import { getAlertColor } from "../_cons/StyleConstants";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;

  return (
    <MetricCardCollection title="Terrain Metrics">
      <MetricCard
        Icon={TerrainIcon}
        label="Elevation"
        value={openElevationData.elevationM.toFixed(1)}
        unit="m"
      />
      <MetricCard
        Icon={TerrainIcon}
        label="Max Slope Angle"
        value={openElevationData.slopeData.slopeAngle.toFixed(0)}
        unit="°"
        alertLabel=""
        color={getAlertColor(openElevationData.slopeData.slopeDangerLevel)}
      />
      <MetricCard
        Icon={TerrainIcon}
        label="Relative Elevation"
        value={openElevationData.relativeElevationData.relativeElevation.toFixed(
          0
        )}
        unit="m"
        alertLabel=""
        color={getAlertColor(
          openElevationData.relativeElevationData.lowGroundDangerLevel
        )}
      />
    </MetricCardCollection>
  );
}
