import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { useDataContext } from "../../nonview/core/DataContext";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import VERSION from "../../nonview/cons/VERSION";

function DataLoadingView() {
  const { data } = useDataContext();
  const { selectedEnt } = useSelectedEntDataContext();

  const loadedData = { ...data, ...{ selectedEnt } };

  const loadingItems = [
    {
      label: "Hydrometric Stations",
      key: "hydrometricStations",
      value: 10,
    },
    {
      label: "Major Cities",
      key: "majorCities",
      value: 100,
    },
    {
      label: "Selected Entity",
      key: "selectedEnt",
      value: 50,
    },
  ].sort((a, b) => a.value - b.value);

  const totalValue = loadingItems.reduce((sum, item) => sum + item.value, 0);
  const loadedValue = loadingItems.reduce(
    (sum, item) => sum + (loadedData[item.key] ? item.value : 0),
    0
  );
  const progressPercentage = (loadedValue / totalValue) * 100;

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 120px)",
        marginTop: "64px",
        marginBottom: "56px",
        zIndex: 200,
        overflow: "auto",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} alignItems="center" sx={{ maxWidth: 400 }}>
        <CircularProgress size={60} />

        <Typography variant="h6">Loading Data...</Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            width: "100%",
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              backgroundColor: "#2196f3",
            },
          }}
        />

        <Stack spacing={1.5} sx={{ width: "100%" }}>
          {loadingItems.map((item) => (
            <Stack
              key={item.key}
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">{item.label}</Typography>
              <Chip
                label={data[item.key] ? "✓ Done" : "Loading..."}
                size="small"
                color={data[item.key] ? "success" : "default"}
                variant={data[item.key] ? "filled" : "outlined"}
              />
            </Stack>
          ))}
        </Stack>

        <Typography variant="caption" sx={{ color: "#999999", marginTop: 2 }}>
          v{VERSION.DATETIME_STR}
        </Typography>
      </Stack>
    </Box>
  );
}

export default DataLoadingView;
