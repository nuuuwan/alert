import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "../_cons/StyleConstants";
import EntAvatar from "../atoms/EntAvatar";
import { t } from "i18next";

const GITHUB_REPO = "https://github.com/nuuuwan/alert";
const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;

const LANGUAGE_LABELS = {
  si: "සිං",
  ta: "த",
  en: "En",
};

export default function CustomAppBar({ selectedEnt, mapLatLng }) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentLanguage = i18n.language;
  const availableLanguages = ["en", "si", "ta"];

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

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
  };

  const handleRefresh = () => {
    localStorage.clear();
    window.location.reload();
  };

  const title =
    (selectedEnt ? selectedEnt.title : null) ||
    (mapLatLng ? mapLatLng.title : null) ||
    "ALERT";

  document.title = title;

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: COLORS.neutral,
        zIndex: 1000,
      }}
    >
      <Toolbar>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {selectedEnt && (
            <EntAvatar ent={selectedEnt} color="white" size="32px" />
          )}
          <span style={{ color: "white", fontSize: "1.2rem" }}>{title}</span>
        </div>
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
          <MenuItem onClick={handleNavigateToRepo}>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            {t("GitHub Repository")}
          </MenuItem>
          <MenuItem onClick={handleNavigateToIssues}>
            <ListItemIcon>
              <BugReportIcon fontSize="small" />
            </ListItemIcon>
            {t("Report Issues")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleRefresh}>
            <ListItemIcon>
              <RefreshIcon fontSize="small" />
            </ListItemIcon>
            {t("Refresh")}
          </MenuItem>
          <Divider />
          {availableLanguages.map((lang) => (
            <MenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              selected={lang === currentLanguage}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                    color: "black",
                    bgcolor: "transparent",
                    fontSize: 11,
                    m: 0,
                    p: 0,
                  }}
                >
                  {LANGUAGE_LABELS[lang]}
                </Avatar>
              </ListItemIcon>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
