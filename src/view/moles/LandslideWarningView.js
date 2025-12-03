import { useState, useEffect } from "react";
import { LandslideWarning, LandslideWarningLevel } from "../../nonview/core";
import RegionView from "./RegionView";
import { OPACITY } from "../_cons/StyleConstants";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";

export default function LandslideWarningView() {
  const [dsds, setDSDs] = useState([]);

  useEffect(() => {
    LandslideWarning.getLatest().then((warning) => {
      if (!warning || !warning.levelToDistrictToDSD) {
        return;
      }

      const dsds = [];
      const levelToDistrictToDSD = warning.levelToDistrictToDSD;

      Object.keys(levelToDistrictToDSD).forEach((level) => {
        const districtToDSD = levelToDistrictToDSD[level];

        Object.keys(districtToDSD).forEach((district) => {
          const dsdList = districtToDSD[district];

          dsdList.forEach((dsdId) => {
            dsds.push({
              dsd: new DSD(dsdId, dsdId),
              level: parseInt(level),
            });
          });
        });
      });

      setDSDs(dsds);
    });
  }, []);

  return (
    <>
      {dsds.map(({ dsd, level }, index) => {
        const warningLevel = LandslideWarningLevel.fromLevel(level);
        return (
          <RegionView
            key={`landslide-dsd-${dsd.id}-${index}`}
            region={dsd}
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
