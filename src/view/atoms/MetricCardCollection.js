import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SourceView from "./SourceView";

export default function MetricCardCollection({ title, children, sourceList }) {
  return (
    <Box>
      <Typography variant="body2" gutterBottom>
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
      <SourceView sourceList={sourceList} />
    </Box>
  );
}
