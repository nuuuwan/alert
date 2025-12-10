import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
import CustomDrawer from "../moles/CustomDrawer";
import EntDetails from "../moles/EntDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import GeoLocation from "../../nonview/base/GeoLocation";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";

export default function MapViewInner({
  centerLatLng,
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  isDrawerOpen,
  setDrawerOpen,
}) {
  const hasSomeEntParam =
    dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [HydrometricStations, setHydrometricStations] = useState([]);
  const [dsdEnts, setDsdEnts] = useState([]);
  const [browserLatLng, setBrowserLatLng] = useState(null);

  useEffect(() => {
    async function fetch() {
      const HydrometricStations = await HydrometricStation.loadWithAlerts();
      setHydrometricStations(HydrometricStations);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchDsdEnts() {
      const dsdEnts = await DSD.loadWithAlerts();
      await Promise.all(dsdEnts.map((dsd) => dsd.loadDetails()));
      setDsdEnts(dsdEnts);
    }
    fetchDsdEnts();
  }, []);

  useEffect(() => {
    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      setBrowserLatLng(latLng);
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        await place.loadDetails();
        setSelectedEnt(place);
      }
    }
    fetchBrowserLocation();
  }, [hasSomeEntParam]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />
      )}

      {dsdEnts &&
        dsdEnts.map((dsd) => <MapRegionView key={dsd.id} region={dsd} />)}

      <CustomDrawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        selectedEnt={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
        browserLatLng={browserLatLng}
      />
    </Box>
  );
}
