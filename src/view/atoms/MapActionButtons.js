import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

export default function MapActionButtons({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 10,
        zIndex: 1000,
      }}
    >
      <IconButton onClick={onCurrentLocation} aria-label="current location">
        <MyLocationIcon />
      </IconButton>
      <IconButton onClick={onSetToMapCenter} aria-label="set to map center">
        <LocationSearchingIcon />
      </IconButton>
      <IconButton onClick={onDownload} aria-label="download">
        <DownloadIcon />
      </IconButton>
    </Box>
  );
}
