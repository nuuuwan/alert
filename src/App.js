import "./App.css";
import MapView from "./view/orgas/MapView";
import CustomAppBar from "./view/moles/CustomAppBar";
import CustomBottomNavigator from "./view/moles/CustomBottomNavigator";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FONT_FAMILY } from "./view/_cons/StyleConstants";
import { useParams } from "react-router-dom";
import { DataProvider } from "./nonview/core/DataContext";

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
  },
});

function App() {
  const { dsdNameId, hydrometricStationNameId, cityNameId, placeLatLngId } =
    useParams();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CustomAppBar />
        <Box sx={{ flexGrow: 1, marginTop: "48px", marginBottom: "48px" }}>
          <DataProvider>
            <MapView
              dsdNameId={dsdNameId}
              hydrometricStationNameId={hydrometricStationNameId}
              placeLatLngId={placeLatLngId}
              cityNameId={cityNameId}
            />
          </DataProvider>
        </Box>
        <CustomBottomNavigator />
      </Box>
    </ThemeProvider>
  );
}

export default App;
