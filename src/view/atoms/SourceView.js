import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function SourceView({ label, url }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary">
        Source:{" "}
        {url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            {label}
          </Link>
        ) : (
          label
        )}
      </Typography>
    </Box>
  );
}
