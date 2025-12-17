import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MapView from "../moles/MapView";
import AlertsView from "../moles/AlertsView";
import DataView from "../moles/DataView";
import NearbyPlacesView from "../moles/NearbyPlacesView";
import DataLoadingView from "../moles/DataLoadingView";
import { useDataContext } from "../../nonview/core/DataContext";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
function PageView({ mapLatLng, setMapLatLng, pageMode, setPageMode }) {
  const { data } = useDataContext();
  const { selectedEnt } = useSelectedEntDataContext();
  const isLoaded = data.hydrometricStations && data.majorCities;

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
          mapLatLng={mapLatLng}
          setMapLatLng={setMapLatLng}
          //
          pageMode={pageMode}
          setPageMode={setPageMode}
        />
      )}
      <Box sx={{ maxWidth: "800px", margin: "auto" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <NearbyPlacesView ent={selectedEnt} />
        </Grid>
        {pageMode === "Alerts" && <AlertsView />}
        {pageMode === "Data" && <DataView />}
      </Box>
    </Box>
  );
}

export default PageView;
