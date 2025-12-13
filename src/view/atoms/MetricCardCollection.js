import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";
import { useTranslation } from "react-i18next";
import CustomPaper from "./CustomPaper";

export default function MetricCardCollection({ title, children, sourceList }) {
  const { t } = useTranslation();
  return (
    <CustomPaper>
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
    </CustomPaper>
  );
}
