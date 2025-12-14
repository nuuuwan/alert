import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DataSourceView from "./DataSourceView";
import { useTranslation } from "react-i18next";
import CustomPaper from "./CustomPaper";
import InfoIcon from "@mui/icons-material/Info";

export default function InformationGroup({
  title,
  children,
  dataSourceList,
  Icon = InfoIcon,
}) {
  const { t } = useTranslation();
  return (
    <CustomPaper>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Icon />
        <Typography variant="h6">{t(title)}</Typography>
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
        <DataSourceView dataSourceList={dataSourceList} />
      </Box>
    </CustomPaper>
  );
}
