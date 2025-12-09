import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/alert">
    >
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/alert" element={<App />} />
      <Route path="/alert/DSD/:dsdNameId" element={<App />} />
      <Route
        path="/alert/HydrometricStation/:hydrometricStationNameId"
        element={<App />}
      />
      <Route path="/alert/Place/:placeLatLngId" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
