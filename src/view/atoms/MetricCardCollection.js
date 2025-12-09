import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCardCollection({ title, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
