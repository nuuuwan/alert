import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function SourceView({ sourceList }) {
  if (!sourceList || sourceList.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary">
        {sourceList.length === 1 ? "Source: " : "Sources: "}
        {sourceList.map((source, index) => (
          <span key={index}>
            {index > 0 && ", "}
            {source.url ? (
              <Link
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="inherit"
              >
                {source.label}
              </Link>
            ) : (
              source.label
            )}
          </span>
        ))}
      </Typography>
    </Box>
  );
}
