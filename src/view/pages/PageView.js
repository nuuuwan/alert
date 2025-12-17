import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MapView from "../moles/MapView";
import AlertsView from "../moles/AlertsView";
import DataView from "../moles/DataView";
import NearbyPlacesView from "../moles/NearbyPlacesView";
import DataLoadingView from "../moles/DataLoadingView";
import { useDataContext } from "../../nonview/core/DataContext";

function PageView({
  dsdNameId,
  hydrometricStationNameId,
  placeLatLngId,
  cityNameId,
  downloadRef,
  mapLatLng,
  setMapLatLng,
  selectedEnt,
  setSelectedEnt,
  pageMode,
  setPageMode,
  onCurrentLocation,
}) {
  const { data } = useDataContext();

  const isLoaded =
    data.hydrometricStations && data.sexAgeDataIdx && data.majorCities;

  if (!isLoaded) {
    return <DataLoadingView />;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 120px)",
        marginTop: "64px",
        marginBottom: "56px",
        zIndex: 200,
        overflow: "auto",
        p: 0,
      }}
    >
      {pageMode === "Map" && (
        <MapView
          dsdNameId={dsdNameId}
          hydrometricStationNameId={hydrometricStationNameId}
          placeLatLngId={placeLatLngId}
          cityNameId={cityNameId}
          //
          downloadRef={downloadRef}
          //
          mapLatLng={mapLatLng}
          setMapLatLng={setMapLatLng}
          //
          selectedEnt={selectedEnt}
          setSelectedEnt={setSelectedEnt}
          //
          pageMode={pageMode}
          setPageMode={setPageMode}
          //
          onCurrentLocation={onCurrentLocation}
        />
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <NearbyPlacesView latLng={selectedEnt ? selectedEnt.latLng : null} />
      </Grid>
      {pageMode === "Alerts" && (
        <AlertsView
          downloadRef={downloadRef}
          //
          selectedEnt={selectedEnt}
          setSelectedEnt={setSelectedEnt}
        />
      )}
      {pageMode === "Data" && (
        <DataView
          downloadRef={downloadRef}
          //
          selectedEnt={selectedEnt}
          setSelectedEnt={setSelectedEnt}
        />
      )}
    </Box>
  );
}

export default PageView;
