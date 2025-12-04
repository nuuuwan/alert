import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LandslideRegionDetails({ latestEvent }) {
  if (!latestEvent) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Landslide Threat Level {latestEvent.level}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
