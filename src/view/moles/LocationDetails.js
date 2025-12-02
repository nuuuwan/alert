import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import { SatelliteImageView, LocationIcon } from "../atoms";

export default function LocationDetails({ location, locationToWeather }) {
  const weather = locationToWeather[location.name];

  if (!weather) {
    return (
      <Box>
        <DetailsHeader
          title={location.name}
          subtitle="Location"
          icon={LocationIcon}
          iconColor="#888888"
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
        iconColor="#888888"
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
          {weather.rainMM !== null && weather.rainMM !== undefined && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h3" component="div">
                {weather.rainMM.toFixed(1)}
                <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                  mm
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rainfall
              </Typography>
            </Box>
          )}

          {(weather.tempMin !== null || weather.tempMax !== null) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" component="div">
                {weather.tempMin !== null && weather.tempMin !== undefined && (
                  <span>
                    {weather.tempMin.toFixed(1)}°C
                    {weather.tempMax !== null &&
                      weather.tempMax !== undefined &&
                      " / "}
                  </span>
                )}
                {weather.tempMax !== null && weather.tempMax !== undefined && (
                  <span>{weather.tempMax.toFixed(1)}°C</span>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Temperature (Min / Max)
              </Typography>
            </Box>
          )}
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
