import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function MarkerDrawer({
  open,
  onClose,
  selectedItem,
  renderContent,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          marginTop: "48px",
          height: "calc(100% - 48px)",
        },
      }}
    >
      <Box sx={{ p: 2, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ mt: 4 }}>{selectedItem && renderContent(selectedItem)}</Box>
      </Box>
    </Drawer>
  );
}
