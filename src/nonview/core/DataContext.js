import { createContext, useContext, useState, useEffect } from "react";
import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";
import TimeUtils from "../base/TimeUtils";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loadVersion, setLoadVersion] = useState(0);
  const [status, setStatus] = useState({
    hydrometricStations: "loading",
    majorCities: "loading",
  });
  const [errors, setErrors] = useState({});
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  const reloadData = () => {
    setErrors({});
    setStatus({
      hydrometricStations: "loading",
      majorCities: "loading",
    });
    setLoadVersion((version) => version + 1);
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const loadHydrometricStations = async () => {
      try {
        await HydrometricStation.getRawAlertData();
        const hydrometricStations = await HydrometricStation.loadAll();
        for (const station of hydrometricStations) {
          await station.loadWaterLevelHistory();
        }
        setData((prevData) => ({ ...prevData, hydrometricStations }));
        setStatus((previous) => ({
          ...previous,
          hydrometricStations: "success",
        }));
      } catch (error) {
        setErrors((previous) => ({
          ...previous,
          hydrometricStations: error,
        }));
        setStatus((previous) => ({
          ...previous,
          hydrometricStations: "error",
        }));
      }
    };

    loadHydrometricStations();
  }, [loadVersion]);

  useEffect(() => {
    const loadMajorCities = async () => {
      try {
        const majorCities = await City.loadAllMajor();
        for (const city of majorCities) {
          await city.loadDetails();
          await TimeUtils.sleep(Math.random() * 0.1);
        }
        setData((prevData) => ({ ...prevData, majorCities }));
        setStatus((previous) => ({ ...previous, majorCities: "success" }));
      } catch (error) {
        setErrors((previous) => ({ ...previous, majorCities: error }));
        setStatus((previous) => ({ ...previous, majorCities: "error" }));
      }
    };

    loadMajorCities();
  }, [loadVersion]);

  return (
    <DataContext.Provider
      value={{ data, setData, status, errors, reloadData, isOnline }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
