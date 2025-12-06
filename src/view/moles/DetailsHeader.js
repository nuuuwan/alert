import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EntIcon from "../atoms/EntIcon";

export default function DetailsHeader({ ent }) {
  const iconSize = 48;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="overline" color="text.secondary">
        {ent.supertitle}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1 }}>
        <Box
          sx={{
            height: iconSize,
            width: iconSize,
            marginTop: "4px",
          }}
        >
          <EntIcon ent={ent} iconSize={iconSize} />
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            lineHeight: `${iconSize}px`,
          }}
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
