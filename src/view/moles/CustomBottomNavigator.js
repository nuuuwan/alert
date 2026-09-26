import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import WarningIcon from "@mui/icons-material/Warning";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { COLORS, getAlertMeta } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";
import Badge from "@mui/material/Badge";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function CustomBottomNavigator({ setPageMode, pageMode }) {
  const { t } = useTranslation();
  const handleMapMode = () => {
    setPageMode("Map");
  };

  const handleAlertsMode = () => {
    setPageMode("Alerts");
  };

  const handleDataMode = () => {
    setPageMode("Data");
  };

  const handleNavigationChange = (event, newValue) => {
    if (newValue === "Map") {
      handleMapMode();
    } else if (newValue === "Alerts") {
      handleAlertsMode();
    } else if (newValue === "Data") {
      handleDataMode();
    }
  };

  const { selectedEnt } = useSelectedEntDataContext();
  const nAlerts = selectedEnt ? selectedEnt.nAlerts : 0;
  const alertMeta = getAlertMeta(selectedEnt ? selectedEnt.alertLevel : 0, 3);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: "calc(56px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={pageMode}
        onChange={handleNavigationChange}
        sx={{
          bgcolor: COLORS.neutralLightest,
        }}
      >
        <BottomNavigationAction
          label={t("Map")}
          value="Map"
          icon={<MapIcon />}
          showLabel={true}
          sx={{
            ...(pageMode === "Map" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
        <BottomNavigationAction
          label={t("Alerts")}
          value="Alerts"
          icon={
            <Badge
              badgeContent={nAlerts > 99 ? "99+" : nAlerts}
              slotProps={{
                badge: {
                  sx: {
                    backgroundColor: alertMeta.color,
                    color: "white",
                    zIndex: 3000,
                  },
                },
              }}
            >
              <WarningIcon />
            </Badge>
          }
          showLabel={true}
          sx={{
            ...(pageMode === "Alerts" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
        <BottomNavigationAction
          label={t("Data")}
          value="Data"
          icon={<AssessmentIcon />}
          showLabel={true}
          sx={{
            ...(pageMode === "Data" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
