import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import UpdateIcon from "@mui/icons-material/Update";
import { useState } from "react";
import VERSION from "../../nonview/cons/VERSION";

export default function AppBarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (url) => {
    window.open(url, "_blank");
    handleMenuClose();
  };

  const handleRefresh = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <IconButton
        color="inherit"
        size="small"
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() =>
            handleMenuItemClick("https://github.com/nuuuwan/alert")
          }
        >
          <ListItemIcon>
            <GitHubIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>GitHub Repository</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick("https://github.com/nuuuwan/alert/issues")
          }
        >
          <ListItemIcon>
            <BugReportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Report Issue</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRefresh}>
          <ListItemIcon>
            <UpdateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update Version</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <Typography variant="body1" color="text.secondary">
            v{VERSION.DATETIME_STR}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
