import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";

export default function AdminRegionView({ AdminRegionClass, id }) {
  const [adminRegion, setAdminRegion] = useState(null);

  useEffect(() => {
    async function fetchRegionData() {
      const region = await AdminRegionClass.loadFromId(id);
      setAdminRegion(region);
    }
    fetchRegionData();
  }, [AdminRegionClass, id]);

  if (!adminRegion) {
    return null;
  }

  return (
    <Chip
      sx={{ m: 0.25 }}
      label={`${
        adminRegion.name
      } ${adminRegion.constructor.getEntTypeName()} (${adminRegion.id})`}
    />
  );
}
