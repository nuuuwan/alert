import "./App.css";
import MapView from "./view/orgas/MapView";
import CustomAppBar from "./view/atoms/CustomAppBar";
import CustomBottomNavigator from "./view/atoms/CustomBottomNavigator";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FONT_FAMILY } from "./view/_cons/StyleConstants";
import { useParams, useNavigate } from "react-router-dom";
import { DataProvider } from "./nonview/core/DataContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import Place from "./nonview/core/ents/places/Place";
import LatLng from "./nonview/base/geos/LatLng";
import { DEFAULT_CENTER } from "./nonview/cons/MapConstants";

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
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

  const [title, setTitle] = useState("ALERT");
  const [pageMode, setPageMode] = useState("Map");

  const handleCurrentLocation = () => {
    navigate("/");
  };

  const handleSetToMapCenter = () => {
    const place = Place.fromLatLng(mapLatLng);
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
      console.debug("Language changed to", lang);
    }
  }, [lang, i18n]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CustomAppBar title={title} />
        <DataProvider>
          <MapView
            dsdNameId={dsdNameId}
            hydrometricStationNameId={hydrometricStationNameId}
            placeLatLngId={placeLatLngId}
            cityNameId={cityNameId}
            setTitle={setTitle}
            pageMode={pageMode}
            setPageMode={setPageMode}
            downloadRef={downloadRef}
            mapLatLng={mapLatLng}
            setMapLatLng={setMapLatLng}
          />
        </DataProvider>
        <CustomBottomNavigator
          onCurrentLocation={handleCurrentLocation}
          onSetToMapCenter={handleSetToMapCenter}
          onDownload={handleDownload}
          setPageMode={setPageMode}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
