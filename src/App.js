import "./App.css";
import MapView from "./view/orgas/MapView";
import CustomAppBar from "./view/atoms/CustomAppBar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FONT_FAMILY } from "./view/_cons/StyleConstants";
import { useParams } from "react-router-dom";
import { DataProvider } from "./nonview/core/DataContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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
  const [title, setTitle] = useState("ALERT");

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
          />
        </DataProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
