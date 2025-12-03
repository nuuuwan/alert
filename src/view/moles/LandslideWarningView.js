import { useState, useEffect } from "react";
import { LandslideWarning, LandslideThreatLevel } from "../../nonview/core";
import RegionView from "./RegionView";
import { OPACITY } from "../_cons/StyleConstants";

export default function LandslideWarningView() {
  const [dsds, setDSDs] = useState([]);

  useEffect(() => {
    LandslideWarning.getLatest().then((warning) => {
      if (!warning || !warning.levelToDistrictToDSD) {
        return;
      }

      const dsdAndLevelList = [];
      const levelToDistrictToDSD = warning.levelToDistrictToDSD;
      Object.keys(levelToDistrictToDSD).forEach((level) => {
        const districtToDSD = levelToDistrictToDSD[level];
        Object.keys(districtToDSD).forEach((districtId) => {
          const dsdIdList = districtToDSD[districtId];
          dsdIdList.forEach((dsdId) => {
            dsdAndLevelList.push({
              dsdId,
              level,
            });
          });
        });
      });

      setDSDs(dsdAndLevelList);
    });
  }, []);

  return (
    <>
      {dsds.map(({ dsdId, level }, index) => {
        const warningLevel = LandslideThreatLevel.fromLevel(level);
        return (
          <RegionView
            key={`landslide-dsd-${dsdId}-${index}`}
            regionId={dsdId}
            pathOptions={{
              color: null,
              fillColor: warningLevel.colorRgb,
              fillOpacity: OPACITY.low,
              weight: 0,
            }}
          />
        );
      })}
    </>
  );
}
