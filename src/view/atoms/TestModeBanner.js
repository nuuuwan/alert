import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SystemMode from "../../nonview/base/SystemMode";

export default function TestModeBanner() {
  if (!SystemMode.isTest()) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1000,
        pointerEvents: "none",
        top: 16,
        left: 16,
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: "red" }}>
        TEST MODE - FAKE DATA
      </Typography>
    </Box>
  );
}
