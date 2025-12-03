import Box from "@mui/material/Box";
import DetailsHeader from "./DetailsHeader";
import GaugingStationDetails from "./GaugingStationDetails";
import WeatherStationDetails from "./WeatherStationDetails";
import { SatelliteImageView, LocationIcon, AdminRegionIcon } from "../atoms";
import { COLORS } from "../_cons/StyleConstants";

export default function EntDetails({
  ent,
  fillColor,
  eventClassNameToEventList,
}) {
  if (!ent) {
    return null;
  }

  const hasLatLng = !!ent.latLng;

  const icon = hasLatLng ? LocationIcon : AdminRegionIcon;
  const iconColor = fillColor || COLORS.gray;

  const overlineText = ent.id !== ent.name ? ent.id : undefined;
  const subtitle = ent.constructor.getEntTypeTitle() || "Entity";

  console.debug(eventClassNameToEventList);

  return (
    <Box>
      <DetailsHeader
        overlineText={overlineText}
        title={ent.name}
        titleColor={fillColor}
        subtitle={subtitle}
        icon={icon}
        iconColor={iconColor}
      />

      {Object.entries(eventClassNameToEventList).map(function ([
        eventClassName,
        eventList,
      ]) {
        if (eventClassName === "RiverWaterLevelMeasurement") {
          return <GaugingStationDetails key={eventClassName} place={ent} />;
        }
        if (eventClassName === "WeatherReport") {
          return <WeatherStationDetails key={eventClassName} place={ent} />;
        }

        return null;
      })}

      {hasLatLng && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 1,
            mb: 1,
          }}
        >
          <SatelliteImageView latLng={ent.latLng} name={ent.name} />
        </Box>
      )}
    </Box>
  );
}
