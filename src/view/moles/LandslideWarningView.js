import { useState, useEffect } from "react";
import { LandslideWarning, Ent } from "../../nonview/core";
import EntView from "./EntView";

export default function LandslideWarningView() {
  const [dsdEnts, setDsdEnts] = useState([]);

  useEffect(() => {
    LandslideWarning.getLatest().then((warning) => {
      if (!warning || !warning.levelToDistrictToDSD) {
        return;
      }

      const ents = [];
      const levelToDistrictToDSD = warning.levelToDistrictToDSD;

      Object.keys(levelToDistrictToDSD).forEach((level) => {
        const districtToDSD = levelToDistrictToDSD[level];

        Object.keys(districtToDSD).forEach((district) => {
          const dsdList = districtToDSD[district];

          dsdList.forEach((dsdId) => {
            ents.push({
              ent: new Ent(dsdId, "dsd", dsdId),
              level: parseInt(level),
            });
          });
        });
      });

      setDsdEnts(ents);
    });
  }, []);

  // Define colors based on landslide warning level
  const getColorForLevel = (level) => {
    switch (level) {
      case 1:
        return "#ff0";
      case 2:
        return "#f80";
      case 3:
        return "#f00";
      default:
        return "#888";
    }
  };

  return (
    <>
      {dsdEnts.map(({ ent, level }, index) => (
        <EntView
          key={`landslide-dsd-${ent.id}-${index}`}
          ent={ent}
          pathOptions={{
            color: getColorForLevel(level),
            fillColor: getColorForLevel(level),
            fillOpacity: 0.3,
            weight: 2,
          }}
        />
      ))}
    </>
  );
}
