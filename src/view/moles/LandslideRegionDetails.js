import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { TimeAgoView } from "../atoms";
import LandslideWarning from "../../nonview/core/events/LandslideWarning";
import LandslideThreatLevel from "../../nonview/core/events/LandslideThreatLevel";
import { COLORS } from "../_cons/StyleConstants";

export default function LandslideRegionDetails({ region }) {
  const [loading, setLoading] = useState(true);
  const [latestWarning, setLatestWarning] = useState(null);
  const [threatLevel, setThreatLevel] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Load landslide warnings
        const warnings = (await LandslideWarning.listForId(region.id)).sort(
          (a, b) => a.timeUt - b.timeUt
        );

        if (warnings.length > 0) {
          const latest = warnings[warnings.length - 1];
          setLatestWarning(latest);

          const level = LandslideThreatLevel.fromLevel(latest.threatLevel);
          setThreatLevel(level);
        }
      } catch (error) {
        console.error("Error loading landslide warning data:", error);
      }
      setLoading(false);
    }

    loadData();
  }, [region.id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!latestWarning || !threatLevel) {
    return null;
  }

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
          <Typography variant="h2">{threatLevel.emoji}</Typography>
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

      <Box sx={{ mt: 2, mb: 2 }}>
        <TimeAgoView date={latestWarning.getDate()} variant="body2" />
      </Box>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
