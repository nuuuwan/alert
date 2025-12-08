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
      <Route path="/DSD/:dsdName" element={<App />} />
      <Route
        path="/HydrometricStation/:hydrometricStationName"
        element={<App />}
      />
      <Route path="/Place/:placeLatLng" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
