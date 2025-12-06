import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";

export default function Stale({ isStale }) {
  if (!isStale) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1,
        py: 0.5,
        borderRadius: "12px",
        backgroundColor: COLORS.neutral,
        color: "white",
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    >
      <Typography variant="caption">Stale Data</Typography>
    </Box>
  );
}
