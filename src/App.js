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
import GeoLocation from "./nonview/base/GeoLocation";
import DataView from "./view/moles/DataView";
import HydrometricStation from "./nonview/core/ents/places/HydrometricStation";
import DSD from "./nonview/core/ents/regions/admin_regions/DSD";
import City from "./nonview/core/ents/places/City";

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
  const [pageMode, setPageMode] = useState("Alerts");
  const [selectedEnt, setSelectedEnt] = useState(null);

  const handleCurrentLocation = () => {
    navigate("/");
  };

  const handleSetToMapCenter = () => {
    const place = Place.fromLatLng(mapLatLng);
    navigate(place.url);
    setPageMode("Alerts");
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

  useEffect(() => {
    const hasSomeEntParam =
      dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        setMapLatLng(latLng);
        navigate(`${place.url}`);
      }
    }
    fetchBrowserLocation();
  }, [
    dsdNameId,
    hydrometricStationNameId,
    cityNameId,
    placeLatLngId,
    navigate,
  ]);

  useEffect(() => {
    async function fetchSelectedDsd() {
      if (dsdNameId) {
        const dsd = await DSD.loadFromName(dsdNameId);
        if (dsd) {
          await dsd.loadDetails();
          setSelectedEnt(dsd);
          setMapLatLng(dsd.getCentroidLatLng());
        }
      }
    }
    fetchSelectedDsd();
  }, [dsdNameId]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setMapLatLng(hydrometricStation.latLng);
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationNameId]);

  useEffect(() => {
    async function fetchCity() {
      if (cityNameId) {
        const city = await City.loadFromName(cityNameId);
        if (city) {
          await city.loadDetails();
          setSelectedEnt(city);
          setMapLatLng(city.latLng);
        }
      }
    }
    fetchCity();
  }, [cityNameId]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLngId) {
        const latLng = LatLng.fromId(placeLatLngId);
        const place = await Place.load({ latLng });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
        }
      }
    }
    fetchPlace();
  }, [placeLatLngId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CustomAppBar title={title} />
        <DataProvider>
          {pageMode === "Map" && (
            <MapView
              dsdNameId={dsdNameId}
              hydrometricStationNameId={hydrometricStationNameId}
              placeLatLngId={placeLatLngId}
              cityNameId={cityNameId}
              //
              setTitle={setTitle}
              pageMode={pageMode}
              downloadRef={downloadRef}
              //
              mapLatLng={mapLatLng}
              setMapLatLng={setMapLatLng}
              //
              selectedEnt={selectedEnt}
              setSelectedEnt={setSelectedEnt}
              //
              setPageMode={setPageMode}
            />
          )}
          {pageMode === "Alerts" && (
            <DataView
              downloadRef={downloadRef}
              getFileName={() => `${title}-alerts.png`}
              setTitle={setTitle}
              //
              selectedEnt={selectedEnt}
              setSelectedEnt={setSelectedEnt}
            />
          )}
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
