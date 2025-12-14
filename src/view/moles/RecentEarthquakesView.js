import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Link,
} from "@mui/material";
import Earthquake from "../../nonview/core/third_party/Earthquake";
import OldMetricCardCollection from "../atoms/OldMetricCardCollection";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function RecentEarthquakesView({ place }) {
  const { earthquakeData } = place;
  const oneWeekAgo = Date.now() / 1000 - 7 * 24 * 60 * 60;
  const recentData = earthquakeData.filter(
    (earthquake) => earthquake.timeUt >= oneWeekAgo,
  );

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 8) return COLORS.highAlert;
    if (magnitude >= 6) return COLORS.mediumAlert;
    if (magnitude >= 4) return COLORS.lowAlert;
    return COLORS.neutral;
  };

  return (
    <OldMetricCardCollection
      title="Recent Earthquakes"
      dataSourceList={[Earthquake.getDataSource()]}
    >
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {recentData.map((earthquake, index) => {
          const formattedDate = TimeUtils.formatMMMDDIImmp(
            new Date(earthquake.timeUt * 1000),
          );
          const formattedTimAgo = TimeUtils.getTimeAgoString(earthquake.timeUt);
          const color = getMagnitudeColor(earthquake.magnitude);

          return (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                borderBottom:
                  index < recentData.length - 1 ? "1px solid #e0e0e0" : "none",
                py: 2,
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={`M${earthquake.magnitude.toFixed(1)}`}
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: color,
                        color: "white",
                      }}
                    />
                    <Link
                      href={earthquake.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ color: "text.primary" }}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ fontWeight: 500 }}
                      >
                        {earthquake.title}
                      </Typography>
                    </Link>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {formattedDate} ({formattedTimAgo})
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </OldMetricCardCollection>
  );
}
