import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/alert">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/DSD/:dsdNameId" element={<App />} />
      <Route
        path="/HydrometricStation/:hydrometricStationNameId"
        element={<App />}
      />
      <Route path="/Place/:placeLatLngId" element={<App />} />
    </Routes>
  </BrowserRouter>,
);

reportWebVitals();
