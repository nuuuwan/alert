import Box from "@mui/material/Box";

export default function MetricCardCollection({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap", // Allow children to wrap into multiple rows
      }}
    >
      {children}
    </Box>
  );
}
