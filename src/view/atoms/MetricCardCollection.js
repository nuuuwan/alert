import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";
import { COLORS } from "../_cons/StyleConstants";

export default function MetricCardCollection({ title, children, sourceList }) {
  return (
    <Box
      sx={{
        background: COLORS.neutralLightest,
        borderRadius: 1,
        m: 1,
        p: 1,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
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
