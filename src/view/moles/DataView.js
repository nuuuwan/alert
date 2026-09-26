import CustomTabs from "../atoms/CustomTabs";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import StatePanel from "../atoms/StatePanel";

export default function DataView() {
  const { selectedEnt } = useSelectedEntDataContext();

  if (!selectedEnt) {
    return <StatePanel state="loading" message="Loading location data" />;
  }

  return (
    <CustomTabs
      tabToChild={{
        Weather: () => <OpenMeteoView place={selectedEnt} />,
        Elevation: () => <OpenElevationView place={selectedEnt} />,
        Satellite: () => <SatelliteImageView place={selectedEnt} />,
        Earthquakes: () => <RecentEarthquakesView place={selectedEnt} />,
        Hydrometric: () => <HydrometricStationDetails place={selectedEnt} />,
      }}
    />
  );
}
