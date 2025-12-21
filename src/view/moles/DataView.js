import CustomTabs from "../atoms/CustomTabs";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";
import { CircularProgress } from "@mui/material";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function DataView() {
  const { selectedEnt } = useSelectedEntDataContext();

  if (!selectedEnt) {
    return <CircularProgress />;
  }

  return (
    <CustomTabs
      tabToChild={{
        Hydrometric: () => <HydrometricStationDetails place={selectedEnt} />,
        Weather: () => <OpenMeteoView place={selectedEnt} />,
        Elevation: () => <OpenElevationView place={selectedEnt} />,
        Satellite: () => <SatelliteImageView place={selectedEnt} />,
        Earthquakes: () => <RecentEarthquakesView place={selectedEnt} />,
      }}
    />
  );
}
