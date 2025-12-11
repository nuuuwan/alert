import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import DownloadableContent from "./DownloadableContent";

export default function DataPanel({ selectedEnt, renderContent }) {
  const downloadRef = useRef(null);
  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
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
          right: 0,
          m: 1,
          zIndex: 1000,
        }}
      >
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
