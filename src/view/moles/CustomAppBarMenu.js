import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import VERSION from "../../nonview/cons/VERSION";
import { Typography } from "@mui/material";
import { COLORS } from "../_cons/StyleConstants";

const GITHUB_REPO = "https://github.com/nuuuwan/alert";
const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;

const LANGUAGE_LABELS_SHORT = {
  si: "සිං",
  ta: "த",
  en: "En",
};

const LANGUAGE_NAME_EN = {
  si: "සිංහල",
  ta: "தමிழ்",
  en: "Enlish",
};

export default function CustomAppBarMenu() {
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

  return (
    <>
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
                  width: 32,
                  height: 32,
                  color: "black",
                  bgcolor: "transparent",
                  fontSize: 18,
                  m: 0,
                  p: 0,
                }}
              >
                {LANGUAGE_LABELS_SHORT[lang]}
              </Avatar>
            </ListItemIcon>
            {LANGUAGE_NAME_EN[lang]}
          </MenuItem>
        ))}
        <Divider />
        <Typography
          variant="caption"
          sx={{ marginLeft: 2 }}
          color={COLORS.neutralLight}
        >
          v{VERSION.DATETIME_STR}
        </Typography>
      </Menu>
    </>
  );
}
