import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import DownloadableContent from "./DownloadableContent";

export default function CustomDrawer({
  selectedEnt,
  renderContent,
  getFileName,
}) {
  const downloadRef = useRef(null);
  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}>
        <IconButton onClick={handleDownload} aria-label="download">
          <DownloadIcon />
        </IconButton>
      </Box>
      <DownloadableContent
        ref={downloadRef}
        getFileName={getFileName}
        selectedItem={selectedEnt}
      >
        <Box sx={{ m: 1, p: 3 }}>{renderContent(selectedEnt)}</Box>
      </DownloadableContent>
    </Box>
  );
}
