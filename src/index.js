import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/alert" element={<App />} />
      <Route path="/alert/DSD/:dsdName" element={<App />} />
      <Route
        path="/alert/HydrometricStation/:hydrometricStationName"
        element={<App />}
      />
      <Route path="/alert/Place/:placeLatLng" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
