import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";
import { COLORS } from "../_cons/StyleConstants";

export default function MetricCardCollection({ title, children, sourceList }) {
  return (
    <Box
      sx={{ background: COLORS.neutralLightest, p: 1, borderRadius: 1, m: 1 }}
    >
      <Box>
        <Typography variant="body2">{title}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {children}
      </Box>

      <Box>
        <SourceView sourceList={sourceList} />
      </Box>
    </Box>
  );
}
