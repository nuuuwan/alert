import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function SourceView({ sourceList }) {
  const { t } = useTranslation();
  if (!sourceList || sourceList.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary">
        {t("Source") + ": "}
        {sourceList.map((source, index) => (
          <span key={index}>
            {index > 0 && ", "}
            <Link
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              {t(source.label)}
            </Link>
          </span>
        ))}
      </Typography>
    </Box>
  );
}
