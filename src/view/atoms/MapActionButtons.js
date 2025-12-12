import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const LANGUAGE_LABELS = {
  en: "E",
  si: "සි",
  ta: "த",
};

export default function MapActionButtons({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = i18n.language;

  const otherLanguages = ["en", "si", "ta"].filter(
    (lang) => lang !== currentLanguage
  );

  const handleLanguageChange = (lang) => {
    const pathParts = location.pathname.split("/").filter((part) => part);
    const currentLang = ["en", "si", "ta"].find((l) => l === pathParts[0]);

    let newPath;
    if (currentLang) {
      pathParts[0] = lang;
      newPath = `/${pathParts.join("/")}`;
    } else {
      newPath = `/${lang}${location.pathname}`;
    }

    navigate(newPath);
    i18n.changeLanguage(lang);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        right: 10,
        zIndex: 1000,
      }}
    >
      {otherLanguages.map((lang) => (
        <IconButton
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          aria-label={`switch to ${lang}`}
          sx={{ width: 48, height: 48 }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: "0.75rem",
              bgcolor: "white",
              color: "black",
            }}
          >
            {LANGUAGE_LABELS[lang]}
          </Avatar>
        </IconButton>
      ))}
      <IconButton
        onClick={onCurrentLocation}
        aria-label="current location"
        sx={{ width: 48, height: 48 }}
      >
        <MyLocationIcon />
      </IconButton>
      <IconButton
        onClick={onSetToMapCenter}
        aria-label="set to map center"
        sx={{ width: 48, height: 48 }}
      >
        <LocationSearchingIcon />
      </IconButton>
      <IconButton
        onClick={onDownload}
        aria-label="download"
        sx={{ width: 48, height: 48 }}
      >
        <DownloadIcon />
      </IconButton>
    </Box>
  );
}
