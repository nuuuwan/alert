import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import DownloadableContent from "./DownloadableContent";

export default function CustomDrawer({
  open,
  onClose,
  selectedEnt,
  renderContent,
  getFileName,
}) {
  const downloadRef = useRef(null);
  if (!selectedEnt) {
    return null;
  }

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%" },
          height: "calc(50% - 48px)",
        },
      }}
    >
      <Box sx={{ height: "100%" }}>
        <Box sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}>
          <IconButton onClick={handleDownload} aria-label="download">
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
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
    </Drawer>
  );
}
