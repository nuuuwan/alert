import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandslideThreatLevel from "../../../../nonview/core/events/LandslideThreatLevel";

export default function LandslideRegionDetails({ latestEvent }) {
  if (!latestEvent) {
    return null;
  }

  const latestWarning = latestEvent;
  const threatLevel = LandslideThreatLevel.fromLevel(latestWarning.threatLevel);

  return (
    <Box>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: threatLevel.colorRgb,
          color: threatLevel.level >= 2 ? "#fff" : "#000",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Landslide Threat Level {threatLevel.level}
            </Typography>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {threatLevel.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
