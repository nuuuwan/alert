import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { STALE_DATA_BADGE } from "../_cons/StyleConstants";

export default function Stale({ isStale }) {
  if (!isStale) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.5,
        borderRadius: "12px",
        ...STALE_DATA_BADGE,
        mt: 1,
      }}
    >
      <Typography variant="caption">Stale Data</Typography>
    </Box>
  );
}
