import { createContext, useContext, useState, useEffect } from "react";
import HydrometricStation from "./ents/places/HydrometricStation";
import CircularProgress from "@mui/material/CircularProgress";
import DSD from "./ents/regions/admin_regions/DSD";
import City from "./ents/places/City";
import TimeUtils from "../base/TimeUtils";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await HydrometricStation.getRawAlertData();
      const hydrometricStations = await HydrometricStation.loadAll();
      const sexAgeDataIdx = await DSD.loadAllSexAgeDataIdx();

      const majorCities = await City.loadAllMajor();
      for (const city of majorCities) {
        await city.loadDetails();
        await TimeUtils.sleep(0.5);
      }

      setData((prevData) => ({
        ...prevData,
        hydrometricStations,
        sexAgeDataIdx,
        majorCities,
      }));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
