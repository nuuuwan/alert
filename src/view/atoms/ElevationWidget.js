import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TerrainIcon from "@mui/icons-material/Terrain";

export default function ElevationWidget({ elevationM }) {
  const elevationFt = (elevationM * 3.28084).toFixed(0);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
      <TerrainIcon sx={{ fontSize: 16 }} />
      <Typography variant="caption" display="inline">
        {elevationM}m
      </Typography>
      <Typography
        variant="caption"
        display="inline"
        sx={{ color: "text.secondary" }}
      >
        / {elevationFt}ft
      </Typography>
    </Box>
  );
}
