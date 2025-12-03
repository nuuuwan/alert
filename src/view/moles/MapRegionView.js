import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";

export default function MapRegionView({ region, pathOptions }) {
  const [latLngListList, setLatLngListList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (region) {
        const latLngListList2 = await region.getLatLngListList();
        setLatLngListList(latLngListList2);
      }
    }
    fetchData();
  }, [region]);

  const handlePolygonClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (!latLngListList || latLngListList.length === 0) {
    return null;
  }

  return (
    <>
      {latLngListList.map((latLngList, index) => (
        <Polygon
          key={`${region.id}-latLngList-${index}`}
          positions={latLngList}
          pathOptions={pathOptions}
          eventHandlers={{
            click: handlePolygonClick,
          }}
        />
      ))}
      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={region}
        renderContent={(region) => (
          <EntDetails ent={region} fillColor={pathOptions.fillColor} />
        )}
        getFileName={() => `${region?.id || "region"}.png`}
      />
    </>
  );
}
