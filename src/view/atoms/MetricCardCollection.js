import Box from "@mui/material/Box";

export default function MetricCardCollection({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
}
