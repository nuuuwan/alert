import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";
import CustomPaper from "../atoms/CustomPaper";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

export default function DetailsHeader({ ent }) {
  const { t } = useTranslation();
  const dsd = ent?.dsd;
  return (
    <Box>
      <CustomPaper>
        <Typography variant="overline" color="text.secondary">
          {ent ? t(ent.supertitle) : <CircularProgress />}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ent ? t(ent.subtitle) : <CircularProgress />}
        </Typography>
      </CustomPaper>
    </Box>
  );
}
