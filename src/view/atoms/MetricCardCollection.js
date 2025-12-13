import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";
import { COLORS } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";

export default function MetricCardCollection({ title, children, sourceList }) {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        background: COLORS.neutralLightest,
        borderRadius: 3,
        m: 3,
        p: 3,
        width: "fit-content",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">{t(title)}</Typography>
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
    </Paper>
  );
}
