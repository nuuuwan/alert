import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";

export default function AlertsView({ selectedEnt }) {
  const place = selectedEnt;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Official Alerts" />
        <Tab label="Auto Alerts (Experimental)" />
      </Tabs>
      <Box hidden={tabValue !== 0}>
        <NaturalDisasterOfficialView place={place} />
      </Box>
      <Box hidden={tabValue !== 1}>
        <NaturalDisasterView place={place} />
      </Box>
    </Box>
  );
}
