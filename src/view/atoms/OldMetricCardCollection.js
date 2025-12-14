import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";
import { useTranslation } from "react-i18next";
import CustomPaper from "./CustomPaper";

export default function OldMetricCardCollection({
  title,
  children,
  sourceList,
}) {
  const { t } = useTranslation();
  return (
    <CustomPaper>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          {t(title)}
        </Typography>
      </Box>

      <Grid container spacing={0} sx={{ mb: 2 }}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {child}
              </Grid>
            ))
          : children}
      </Grid>

      <Box>
        <SourceView sourceList={sourceList} />
      </Box>
    </CustomPaper>
  );
}
