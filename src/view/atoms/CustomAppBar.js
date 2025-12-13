import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { COLORS } from "../_cons/StyleConstants";

const GITHUB_REPO = "https://github.com/nuuuwan/alert";
const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;

export default function CustomAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToRepo = () => {
    window.open(GITHUB_REPO, "_blank");
    handleMenuClose();
  };

  const handleNavigateToIssues = () => {
    window.open(GITHUB_ISSUES, "_blank");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: COLORS.neutral,
      }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          aria-label="menu"
          aria-controls="app-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="app-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleNavigateToRepo}>GitHub Repository</MenuItem>
          <MenuItem onClick={handleNavigateToIssues}>Report Issues</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
