import "./App.css";
import CustomAppBar from "./view/moles/CustomAppBar";
import CustomBottomNavigator from "./view/moles/CustomBottomNavigator";
import PageView from "./view/pages/PageView";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { COLORS, FONT_FAMILY } from "./view/_cons/StyleConstants";
import { useParams, useNavigate } from "react-router-dom";
import { DataProvider } from "./nonview/core/DataContext";
import { SelectedEntDataProvider } from "./nonview/core/SelectedEntDataContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import Place from "./nonview/core/ents/places/Place";
import LatLng from "./nonview/base/geos/LatLng";
import { DEFAULT_CENTER } from "./nonview/cons/MapConstants";

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: COLORS.neutral,
    },
  },
});

function App() {
  const {
    dsdNameId,
    hydrometricStationNameId,
    cityNameId,
    placeLatLngId,
    lang,
  } = useParams();

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const downloadRef = useRef(null);
  const [mapLatLng, setMapLatLng] = useState(LatLng.fromRaw(DEFAULT_CENTER));
  const [pageMode, setPageMode] = useState("Map");

  const handleSetToMapCenter = () => {
    const place = Place.fromLatLng(mapLatLng);
    setPageMode("Alerts");
    navigate(place.url);
  };

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
  };

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <DataProvider>
          <SelectedEntDataProvider
            dsdNameId={dsdNameId}
            hydrometricStationNameId={hydrometricStationNameId}
            cityNameId={cityNameId}
            placeLatLngId={placeLatLngId}
            setMapLatLng={setMapLatLng}
          >
            <CustomAppBar mapLatLng={mapLatLng} />
            <PageView
              mapLatLng={mapLatLng}
              setMapLatLng={setMapLatLng}
              pageMode={pageMode}
              setPageMode={setPageMode}
            />
            <CustomBottomNavigator
              onSetToMapCenter={handleSetToMapCenter}
              onDownload={handleDownload}
              setPageMode={setPageMode}
              pageMode={pageMode}
            />
          </SelectedEntDataProvider>
        </DataProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
