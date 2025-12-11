import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DownloadableContent from "./DownloadableContent";

export default function DataPanel({ selectedEnt, renderContent }) {
  const downloadRef = useRef(null);
  const navigate = useNavigate();

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
  };

  const handleCurrentLocation = () => {
    navigate("/");
  };

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          right: 10,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleCurrentLocation}
          aria-label="current location"
        >
          <MyLocationIcon />
        </IconButton>
        <IconButton onClick={handleDownload} aria-label="download">
          <DownloadIcon />
        </IconButton>
      </Box>
      <DownloadableContent
        ref={downloadRef}
        getFileName={getFileName}
        selectedItem={selectedEnt}
      >
        <Box>{renderContent(selectedEnt)}</Box>
      </DownloadableContent>
    </Box>
  );
}
