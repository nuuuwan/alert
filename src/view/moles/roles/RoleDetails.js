import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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

export default function RoleDetails({
  eventClassName,
  ent,
  eventList,
  isStale,
}) {
  if (eventList.length === 0) {
    throw new Error("eventList cannot be empty");
  }
  const RoleDetailsComponent = getRoleDetailsComponent(eventClassName);
  eventList = eventList.sort((a, b) => b.timeUt - a.timeUt);
  const latestEvent = eventList[0];

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Box sx={{ mt: 2, mb: 2 }}>
        <TimeAgoView
          date={latestEvent.getDate()}
          variant="body2"
          isStale={isStale}
        />
      </Box>
      <RoleDetailsComponent
        ent={ent}
        eventList={eventList}
        latestEvent={latestEvent}
        isStale={isStale}
      />
      <Divider sx={{ my: 3 }} />
    </Paper>
  );
}
