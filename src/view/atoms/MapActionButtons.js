import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useTranslation } from "react-i18next";
import { COLORS } from "../_cons/StyleConstants";

const LANGUAGE_LABELS = {
  si: "සිං",
  ta: "த",
  en: "En",
};

export default function MapActionButtons({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const otherLanguages = ["en", "si", "ta"].filter(
    (lang) => lang !== currentLanguage
  );

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const iconSize = 36;

  const iconButtonStyle = {
    width: iconSize,
    height: iconSize,
    m: 0.25,
    p: 0,
    bgcolor: COLORS.neutralLightest,
  };
  return (
    <Box
      sx={{
        position: "absolute",
        left: "10",
        zIndex: 1000,
        m: 0,
        p: 0,
      }}
    >
      <IconButton
        onClick={onCurrentLocation}
        aria-label="current location"
        sx={iconButtonStyle}
      >
        <MyLocationIcon />
      </IconButton>
      <IconButton
        onClick={onSetToMapCenter}
        aria-label="set to map center"
        sx={iconButtonStyle}
      >
        <LocationSearchingIcon />
      </IconButton>
      <IconButton
        onClick={onDownload}
        aria-label="download"
        sx={iconButtonStyle}
      >
        <DownloadIcon />
      </IconButton>
      {otherLanguages.map((lang) => (
        <IconButton
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          aria-label={`switch to ${lang}`}
          sx={iconButtonStyle}
        >
          <Avatar
            sx={{
              width: iconSize * 0.9,
              height: iconSize * 0.9,
              color: "black",
              bgcolor: "transparent",
              fontSize: iconSize * 0.5,
              m: 0,
              p: 0,
            }}
          >
            {LANGUAGE_LABELS[lang]}
          </Avatar>
        </IconButton>
      ))}
    </Box>
  );
}
