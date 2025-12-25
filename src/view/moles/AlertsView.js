import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import CustomTabs from "../atoms/CustomTabs";
import { getAlertColor } from "../_cons/StyleConstants";
import { CircularProgress, Typography } from "@mui/material";

export default function AlertsView() {
  const { selectedEnt } = useSelectedEntDataContext();
  if (!selectedEnt) {
    return <CircularProgress />;
  }

  return (
    <CustomTabs
      tabToChild={{
        "Official Alerts": () => (
          <NaturalDisasterOfficialView place={selectedEnt} />
        ),
        "Auto Alerts": () => <NaturalDisasterView place={selectedEnt} />,
      }}
      tabToColor={{
        "Official Alerts": getAlertColor(selectedEnt.officialAlertLevel),
        "Auto Alerts": getAlertColor(selectedEnt.autoAlertLevel),
      }}
      tabToNAlerts={{
        "Official Alerts": selectedEnt.nOfficialAlerts,
        "Auto Alerts": selectedEnt.nAutoAlerts,
      }}
      renderButtonInner={(text, color) => (
        <Typography variant="h6" style={{ color }}>
          {text}
        </Typography>
      )}
    />
  );
}
