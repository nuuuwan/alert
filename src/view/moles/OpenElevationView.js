import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import TerrainIcon from "@mui/icons-material/Terrain";
import { getAlertColor } from "../_cons/StyleConstants";

export default function OpenElevationView({ place }) {
  const { openElevationData } = place;
  console.debug({ openElevationData });
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
        value={openElevationData.slopeData.slopeAngle.toFixed(1)}
        unit="°"
        alertLabel={
          openElevationData.slopeData.slopeDangerLevel > 0
            ? `Level ${openElevationData.slopeData.slopeDangerLevel}`
            : ""
        }
        color={getAlertColor(openElevationData.slopeData.slopeDangerLevel)}
      />
      <MetricCard
        Icon={TerrainIcon}
        label="Relative Elevation"
        value={
          (openElevationData.relativeElevationData.relativeElevation > 0
            ? "+"
            : "") +
          openElevationData.relativeElevationData.relativeElevation.toFixed(1)
        }
        unit="m"
        alertLabel={
          openElevationData.relativeElevationData.lowGroundDangerLevel > 0
            ? `Level ${openElevationData.relativeElevationData.lowGroundDangerLevel}`
            : ""
        }
        color={getAlertColor(
          openElevationData.relativeElevationData.lowGroundDangerLevel
        )}
      />
    </MetricCardCollection>
  );
}
