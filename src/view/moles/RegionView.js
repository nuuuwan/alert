import { Polygon } from "react-leaflet";
import { useState, useEffect } from "react";

import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import CustomDrawer from "./CustomDrawer";
import RegionDetails from "./RegionDetails";

export default function RegionView({ regionId, pathOptions }) {
  const [region, setRegion] = useState(null);
  const [latLngListList, setLatLngListList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchRegion() {
      const region2 = await DSD.fromID(regionId);
      setRegion(region2);
    }
    fetchRegion();
  }, [regionId]);

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
          <RegionDetails region={region} fillColor={pathOptions.fillColor} />
        )}
        getFileName={() => `${region?.id || "region"}.png`}
      />
    </>
  );
}
