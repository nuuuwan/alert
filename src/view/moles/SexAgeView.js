import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import ChildCareIcon from "@mui/icons-material/ChildCareOutlined";
import ElderlyIcon from "@mui/icons-material/ElderlyOutlined";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import Tooltip from "@mui/material/Tooltip";
import FemaleIcon from "@mui/icons-material/Female";

const dataConfig = [
  { label: "Area", key: "areaSqKm", Icon: CropOriginalIcon },
  { label: "Population", key: "population", Icon: PeopleIcon },
  { label: "Female Population", key: "femalePopulation", Icon: FemaleIcon },
  { label: "Under 15", key: "ageUnder15", Icon: ChildCareIcon },
  { label: "Over 65", key: "age65andOver", Icon: ElderlyIcon },
];

function SexAgeView({ sexAgeData, areaSqKm }) {
  if (!sexAgeData) {
    return <Typography variant="body2">No data available</Typography>;
  }

  const allData = { ...sexAgeData, areaSqKm: areaSqKm };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {dataConfig.map(({ key, Icon, label }) => (
        <Tooltip key={key} title={label} arrow>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Icon fontSize="small" />
            <Typography variant="body2" component="span">
              {allData[key].toLocaleString()}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

export default SexAgeView;
