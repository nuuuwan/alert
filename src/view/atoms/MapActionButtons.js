import CustomBottomNavigator from "./CustomBottomNavigator";

export default function MapActionButtons({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  return (
    <CustomBottomNavigator
      onCurrentLocation={onCurrentLocation}
      onSetToMapCenter={onSetToMapCenter}
      onDownload={onDownload}
    />
  );
}
