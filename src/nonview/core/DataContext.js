import { createContext, useContext, useState, useEffect } from "react";
import HydrometricStation from "./ents/places/HydrometricStation";
import CircularProgress from "@mui/material/CircularProgress";
import DSD from "./ents/regions/admin_regions/DSD";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await HydrometricStation.getRawAlertData();
      const hydrometricStations = await HydrometricStation.loadAll();
      const sexAgeDataIdx = await DSD.loadAllSexAgeDataIdx();

      setData((prevData) => ({
        ...prevData,
        hydrometricStations,
        sexAgeDataIdx,
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
