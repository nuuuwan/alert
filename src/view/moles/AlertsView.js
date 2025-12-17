import { useState } from "react";
import Box from "@mui/material/Box";
import CustomTab from "../atoms/CustomTab";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";
import { useTranslation } from "react-i18next";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import CustomTabs from "../atoms/CustomTabs";
import { getAlertColor } from "../_cons/StyleConstants";

export default function AlertsView() {
  const { t } = useTranslation();
  const { selectedEnt } = useSelectedEntDataContext();
  const place = selectedEnt;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabs value={tabValue} onChange={handleTabChange}>
        <CustomTab
          label={t("Official Alerts")}
          color={getAlertColor(place?.officialAlertLevel || 0, 3)}
        />
        <CustomTab
          label={t("Auto Alerts (Experimental)")}
          color={getAlertColor(place?.autoAlertLevel || 0, 3)}
        />
      </CustomTabs>
      <Box hidden={tabValue !== 0}>
        <NaturalDisasterOfficialView place={place} />
      </Box>
      <Box hidden={tabValue !== 1}>
        <NaturalDisasterView place={place} />
      </Box>
    </Box>
  );
}
