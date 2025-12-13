import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { COLORS } from "../_cons/StyleConstants";

const LANGUAGE_LABELS = {
  si: "සිං",
  ta: "த",
  en: "En",
};

export default function CustomBottomNavigator({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  const { i18n } = useTranslation();
  const [value, setValue] = useState(0);

  const currentLanguage = i18n.language;
  const otherLanguages = ["en", "si", "ta"].filter(
    (lang) => lang !== currentLanguage
  );

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      onCurrentLocation();
    } else if (newValue === 1) {
      onSetToMapCenter();
    } else if (newValue === 2) {
      onDownload();
    } else if (newValue >= 3) {
      const langIndex = newValue - 3;
      handleLanguageChange(otherLanguages[langIndex]);
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleNavigationChange}
        sx={{
          bgcolor: COLORS.neutralLightest,
        }}
      >
        <BottomNavigationAction icon={<MyLocationIcon />} />
        <BottomNavigationAction icon={<PlaceIcon />} />
        <BottomNavigationAction icon={<DownloadIcon />} />
        {otherLanguages.map((lang, index) => (
          <BottomNavigationAction
            key={lang}
            icon={
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  color: "black",
                  bgcolor: "transparent",
                  fontSize: 12,
                  m: 0,
                  p: 0,
                }}
              >
                {LANGUAGE_LABELS[lang]}
              </Avatar>
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
