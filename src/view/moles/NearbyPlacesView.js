import { useEffect, useState } from "react";
import Nearby from "../../nonview/core/Nearby";
import PlaceLink from "../atoms/PlaceLink";
import CustomPaper from "../atoms/CustomPaper";

export default function NearbyPlacesView({ latLng }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (latLng) {
        const nearby = await Nearby.findNearbyPlaces(latLng);
        setNearbyPlaces(nearby);
      }
    };

    fetchNearbyPlaces();
  }, [latLng]);

  if (nearbyPlaces.length === 0) {
    return null;
  }

  return (
    <CustomPaper>
      {nearbyPlaces.map(([place, distanceM]) => (
        <PlaceLink key={place.id} place={place} distanceM={distanceM} />
      ))}
    </CustomPaper>
  );
}
