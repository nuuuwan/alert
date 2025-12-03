import "./App.css";
import MapView from "./view/orgas/MapView";
import CustomAppBar from "./view/moles/CustomAppBar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Ubuntu Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
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
