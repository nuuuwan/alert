import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import CustomTabs from "../atoms/CustomTabs";
import { getAlertColor } from "../_cons/StyleConstants";
import { Typography } from "@mui/material";

export default function AlertsView() {
  const { selectedEnt } = useSelectedEntDataContext();

  return (
    <CustomTabs
      tabToChild={{
        "Official Alerts": () => (
          <NaturalDisasterOfficialView place={selectedEnt} />
        ),
        "Auto Alerts (Experimental)": () => (
          <NaturalDisasterView place={selectedEnt} />
        ),
      }}
      tabToColor={{
        "Official Alerts": getAlertColor(selectedEnt.officialAlertLevel),
        "Auto Alerts (Experimental)": getAlertColor(selectedEnt.autoAlertLevel),
      }}
      renderButtonInner={(text, color) => (
        <Typography variant="h6" style={{ color }}>
          {text}
        </Typography>
      )}
    />
  );
}
