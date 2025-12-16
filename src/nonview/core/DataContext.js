import { createContext, useContext, useState, useEffect } from "react";
import HydrometricStation from "./ents/places/HydrometricStation";
import DSD from "./ents/regions/admin_regions/DSD";
import City from "./ents/places/City";
import TimeUtils from "../base/TimeUtils";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await HydrometricStation.getRawAlertData();
      const hydrometricStations = await HydrometricStation.loadAll();
      console.debug("Loaded hydrometricStations.");
      const sexAgeDataIdx = await DSD.loadAllSexAgeDataIdx();
      console.debug("Loaded sexAgeDataIdx.");

      const majorCities = await City.loadAllMajor();
      for (const city of majorCities) {
        await city.loadDetails();
        await TimeUtils.sleep(Math.random() * 0.1);
      }
      console.debug("Loaded majorCities.");

      setData((prevData) => ({
        ...prevData,
        hydrometricStations,
        sexAgeDataIdx,
        majorCities,
      }));
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
