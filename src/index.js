import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="" element={<App />} />
      <Route path="/DSD/:dsdNameId" element={<App />} />

      <Route
        path="/HydrometricStation/:hydrometricStationNameId"
        element={<App />}
      />
      <Route path="/City/:cityNameId" element={<App />} />
      <Route path="/Hospital/:hospitalNameId" element={<App />} />
      <Route path="/PoliceStation/:policeStationNameId" element={<App />} />
      <Route path="/FireStation/:fireStationNameId" element={<App />} />

      <Route path="/Place/:placeLatLngId" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
