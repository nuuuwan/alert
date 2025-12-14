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
  InnerComponent = Grid,
}) {
  const { t } = useTranslation();
  return (
    <CustomPaper>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Icon />
        <Typography variant="h6">{t(title)}</Typography>
      </Box>

      <InnerComponent container spacing={0}>
        {children}
      </InnerComponent>

      <Box>
        <DataSourceView dataSourceList={dataSourceList} />
      </Box>
    </CustomPaper>
  );
}
