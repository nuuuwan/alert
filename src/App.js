import "./App.css";
import MapView from "./view/orgas/MapView";
import Header from "./view/moles/Header";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, marginTop: "48px" }}>
        <MapView />
      </Box>
    </Box>
  );
}

export default App;
