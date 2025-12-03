import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import {
  SatelliteImageView,
  LocationIcon,
  RainfallView,
  TemperatureView,
} from "../atoms";
import { COLORS } from "../_cons/StyleConstants";

export default function LocationDetails({ location, locationToWeather }) {
  const weather = locationToWeather[location.name];

  if (!weather) {
    return (
      <Box>
        <DetailsHeader
          title={location.name}
          subtitle="Location"
          icon={LocationIcon}
          iconColor={COLORS.gray}
        />
        <Typography variant="body2" color="text.secondary">
          No weather data available
        </Typography>
      </Box>
    );
  }

  const date = weather.date;

  return (
    <Box>
      <DetailsHeader
        title={location.name}
        subtitle="Location"
        date={date}
        icon={LocationIcon}
        iconColor={COLORS.gray}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <Box margin={2}>
          <Box sx={{ mb: 2 }}>
            <RainfallView rainMM={weather.rainMM} />
          </Box>

          <TemperatureView
            tempMin={weather.tempMin}
            tempMax={weather.tempMax}
          />
        </Box>

        <SatelliteImageView latLng={location.latLng} name={location.name} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary">
        Data Source: Department of Meteorology, Sri Lanka.
      </Typography>
    </Box>
  );
}
