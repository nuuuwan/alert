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
      sx={{ backgroundColor: "white", p: 0, m: 0 }}
      label={
        <>
          {adminRegion.name}{" "}
          <span style={{ opacity: 0.25 }}>
            {adminRegion.constructor.getEntTypeNameShort()}
          </span>
        </>
      }
    />
  );
}
