import { useState, useEffect } from "react";
import {
  LandslideWarning,
  LandslideWarningLevel,
  Ent,
} from "../../nonview/core";
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

  return (
    <>
      {dsdEnts.map(({ ent, level }, index) => {
        const warningLevel = LandslideWarningLevel.fromLevel(level);
        return (
          <EntView
            key={`landslide-dsd-${ent.id}-${index}`}
            ent={ent}
            pathOptions={{
              color: null,
              fillColor: warningLevel.colorRgb,
              fillOpacity: 0.3,
              weight: 0,
            }}
          />
        );
      })}
    </>
  );
}
