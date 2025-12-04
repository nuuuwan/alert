import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { TimeAgoView } from "../../atoms";
import GaugingStationDetails from "./gauging_station/GaugingStationDetails";
import WeatherStationDetails from "./weather_station/WeatherStationDetails";
import LandslideRegionDetails from "./landslide_area/LandslideRegionDetails";

function getRoleDetailsComponent(eventClassName) {
  return {
    RiverWaterLevelMeasurement: GaugingStationDetails,
    WeatherReport: WeatherStationDetails,
    LandslideWarning: LandslideRegionDetails,
  }[eventClassName];
}

export default function RoleDetails({ eventClassName, ent, eventList }) {
  const [loading, setLoading] = useState(true);
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      const sorted = [...eventList].sort((a, b) => a.timeUt - b.timeUt);
      setLatestEvent(sorted[sorted.length - 1]);
    }
    setLoading(false);
  }, [eventList]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!latestEvent) {
    return null;
  }

  const RoleDetailsComponent = getRoleDetailsComponent(eventClassName);

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Box sx={{ mt: 2, mb: 2 }}>
        <TimeAgoView date={latestEvent.getDate()} variant="body2" />
      </Box>
      <RoleDetailsComponent
        ent={ent}
        eventList={eventList}
        latestEvent={latestEvent}
      />
      <Divider sx={{ my: 3 }} />
    </Paper>
  );
}
