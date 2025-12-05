import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import RoleDetails from "./roles/RoleDetails";
import { SatelliteImageView } from "../atoms";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";

export default function PlaceDetails({
  place,
  eventClassNameToEventList,
  isStale,
}) {
  const [openMeteoData, setOpenMeteoData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await OpenMeteo.getData({ latLng: place.latLng });
      setOpenMeteoData(data);
    }
    fetchData();
  }, [place.latLng]);

  return (
    <Box>
      {Object.entries(eventClassNameToEventList).map(function ([
        eventClassName,
        eventList,
      ]) {
        if (eventList.length === 0) {
          return null;
        }
        return (
          <RoleDetails
            key={eventClassName}
            eventClassName={eventClassName}
            ent={place}
            eventList={eventList}
            isStale={isStale}
          />
        );
      })}
      {JSON.stringify(openMeteoData)}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <SatelliteImageView latLng={place.latLng} name={place.name} />
      </Box>
    </Box>
  );
}
