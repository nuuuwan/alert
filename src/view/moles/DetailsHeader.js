import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EntIcon from "../atoms/EntIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";

export default function DetailsHeader({ ent, supertitleOverride }) {
  const iconSize = 48;
  const color = getAlertColor(ent.alertLevel) || COLORS.neutral;
  return (
    <Box>
      <Typography variant="overline" color="text.secondary">
        {supertitleOverride ? supertitleOverride : ent.supertitle}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box
          sx={{
            height: iconSize,
            width: iconSize,
          }}
        >
          <EntIcon ent={ent} iconSize={iconSize} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            lineHeight: `${iconSize}px`,
          }}
          color={color}
        >
          {ent.title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {ent.subtitle}
      </Typography>
    </Box>
  );
}
