import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function MarkerDrawer({
  open,
  onClose,
  selectedItem,
  renderContent,
  getFileName,
}) {
  const contentRef = useRef(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const fileName = getFileName
        ? getFileName(selectedItem)
        : `station-details-${Date.now()}.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          padding: "6px",
          height: "calc(100% - 6px)",
        },
      }}
    >
      <Box ref={contentRef} sx={{ p: 2, position: "relative" }}>
        <IconButton
          onClick={handleDownload}
          sx={{ position: "absolute", right: 48, top: 8 }}
          aria-label="download"
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box>{selectedItem && renderContent(selectedItem)}</Box>
      </Box>
    </Drawer>
  );
}
