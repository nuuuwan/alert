import HydrometricStation from "./ents/places/HydrometricStation";

export function getOfficialAlerts(place) {
  const alerts = [];
  if (place.dsd?.latestLandslideWarningLevel > 0) {
    alerts.push({
      name: "Landslide",
      level: place.dsd.latestLandslideWarningLevel,
      detail: "Official warning level {{level}}",
      detailValues: { level: place.dsd.latestLandslideWarningLevel },
      timeUt: place.dsd.latestLandslideWarningTimeUt,
      dataSourceList: [place.dsd.landslideAlertDataSource],
    });
  }
  if (place.waterLevelAlertLevel > 0) {
    alerts.push({
      name: "Flood",
      level: place.waterLevelAlertLevel,
      detail: "Current water level: {{level}} m",
      detailValues: { level: place.latestWaterLevelM?.toFixed(2) || "N/A" },
      timeUt: place.latestWaterLevelTimeUt,
      dataSourceList: [HydrometricStation.getWaterLevelAlertDataSource()],
    });
  }
  return alerts;
}

export function getExperimentalAlerts(place) {
  return (place.autoAlertList || [])
    .filter((alert) => alert.level > 0)
    .map((alert) => ({
      name: alert.name,
      level: alert.level,
      detail: "{{score}} of {{total}} risk factors are active · {{period}}",
      detailValues: {
        score: alert.score,
        total: alert.maxScore,
        period: alert.timeLabel,
      },
      timeUt: place.openMeteoData?.timeUtNow,
      dataSourceList: alert.getDataSourceList(),
    }));
}
