import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import ChildCareIcon from "@mui/icons-material/ChildCareOutlined";
import ElderlyIcon from "@mui/icons-material/ElderlyOutlined";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import FemaleIcon from "@mui/icons-material/Female";
import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import { COLORS } from "../_cons/StyleConstants";

const dataConfig = [
  { label: "Area", key: "areaSqKm", unit: "km²", Icon: CropOriginalIcon },
  { label: "Population", key: "population", unit: "", Icon: PeopleIcon },
  {
    label: "Female",
    key: "femalePopulation",
    unit: "",
    Icon: FemaleIcon,
  },
  { label: "Under 15", key: "ageUnder15", unit: "", Icon: ChildCareIcon },
  { label: "Over 65", key: "age65andOver", unit: "", Icon: ElderlyIcon },
];

function SexAgeView({ sexAgeData, areaSqKm }) {
  if (!sexAgeData) {
    return <Typography variant="body2">No data available</Typography>;
  }

  const allData = { ...sexAgeData, areaSqKm: areaSqKm };

  return (
    <MetricCardCollection
      title="Demographics"
      sourceList={[
        {
          url: "https://github.com/nuuuwan/lk_census_2024",
          label:
            "Census of Population and Housing 2024, Department of Census and Statistics, Sri Lanka",
        },
      ]}
    >
      {dataConfig.map(({ key, Icon, label, unit }) => (
        <MetricCard
          key={key}
          label={label}
          value={allData[key]?.toLocaleString() || "N/A"}
          unit={unit}
          Icon={Icon}
          color={COLORS.neutral}
          timeLabel="2024"
        />
      ))}
    </MetricCardCollection>
  );
}

export default SexAgeView;
