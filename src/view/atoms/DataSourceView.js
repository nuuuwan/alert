import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function DataSourceView({ dataSourceList }) {
  const { t } = useTranslation();
  if (!dataSourceList || dataSourceList.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, maxWidth: "320px" }}>
      <Typography variant="caption" color="text.secondary">
        {t("Source") + ": "}
        {dataSourceList.map((dataSource, index) => (
          <span key={index}>
            {index > 0 && ", "}
            <Link
              href={dataSource.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              {t(dataSource.label)}
            </Link>
          </span>
        ))}
      </Typography>
    </Box>
  );
}
