import "./App.css";
import MapView from "./view/orgas/MapView";
import CustomAppBar from "./view/moles/CustomAppBar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FONT_FAMILY } from "./view/_cons/StyleConstants";

const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CustomAppBar />
        <Box sx={{ flexGrow: 1, marginTop: "48px" }}>
          <MapView />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
