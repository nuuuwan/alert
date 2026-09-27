import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MapView from "../moles/MapView";
import AlertsView from "../moles/AlertsView";
import DataView from "../moles/DataView";
import NearbyPlacesView from "../moles/NearbyPlacesView";
import DataLoadingView from "../moles/DataLoadingView";
import { useDataContext } from "../../nonview/core/DataContext";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import Alert from "@mui/material/Alert";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { useTranslation } from "react-i18next";
import SummaryView from "../moles/SummaryView";
function PageView({ mapLatLng, setMapLatLng, pageMode, setPageMode }) {
  const { t } = useTranslation();
  const { data, isOnline } = useDataContext();
  const { selectedEnt, selectedStatus } = useSelectedEntDataContext();
  const isLoaded = data.hydrometricStations && data.majorCities;

  const isPageModeMap = pageMode === "Map";
  const showLoadingModal = !isLoaded || selectedStatus !== "success";

  return (
    <Box sx={{}}>
      {!isOnline && (
        <Alert
          severity="warning"
          icon={<WifiOffIcon />}
          sx={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 1400 }}
        >
          {t(
            "Offline · Showing previously loaded information. Updates will resume when connected.",
          )}
        </Alert>
      )}
      {showLoadingModal && <DataLoadingView />}
      <Box
        sx={{
          position: "absolute",
          top: "64px",
          bottom: "calc(56px + env(safe-area-inset-bottom))",
          width: "100%",
          zIndex: 200,
          overflow: "auto",
          p: 0,
        }}
      >
        <MapView
          mapLatLng={mapLatLng}
          setMapLatLng={setMapLatLng}
          //
          pageMode={pageMode}
          setPageMode={setPageMode}
        />
      </Box>

      {!isPageModeMap && !showLoadingModal && (
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            bottom: "calc(56px + env(safe-area-inset-bottom))",
            width: "100%",
            zIndex: 1200,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: "640px",
              margin: "auto",
              minHeight: "100%",
              bgcolor: "background.default",
            }}
          >
            {pageMode === "Alerts" && <AlertsView />}
            {pageMode === "Data" && <DataView />}
            {pageMode === "Summary" && (
              <SummaryView
                place={selectedEnt}
                onViewDetails={() => setPageMode("Alerts")}
              />
            )}
            {pageMode !== "Summary" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <NearbyPlacesView ent={selectedEnt} />
              </Grid>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PageView;
