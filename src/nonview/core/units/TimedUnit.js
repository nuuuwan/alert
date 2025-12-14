import Temperature from "./Temperature";
import DewPoint from "./DewPoint";
import RelativeHumidity from "./RelativeHumidity";
import RainHours from "./RainHours";
import Elevation from "./Elevation";
import Rain from "./Rain";
import SoilMoisture from "./SoilMoisture";
import Slope from "./Slope";
import RelativeElevation from "./RelativeElevation";
import EarthquakeMagnitude from "./EarthquakeMagnitude";

export default class TimedUnit {
  constructor({ unitValue, timeLabel }) {
    this.unitValue = unitValue;
    this.timeLabel = timeLabel;
  }
}

function getUnitClass(key) {
  if (key.startsWith("temp")) {
    return Temperature;
  }
  if (key.startsWith("dewPoint")) {
    return DewPoint;
  }
  if (key.startsWith("relativeHumidity")) {
    return RelativeHumidity;
  }
  if (key.startsWith("rainHours")) {
    return RainHours;
  }
  if (key.startsWith("rain")) {
    return Rain;
  }
  if (key.startsWith("elevation")) {
    return Elevation;
  }
  if (key.startsWith("soilMoisture")) {
    return SoilMoisture;
  }
  if (key.startsWith("slope")) {
    return Slope;
  }
  if (key.startsWith("relativeElevation")) {
    return RelativeElevation;
  }
  if (key.startsWith("earthquakeMagnitude")) {
    return EarthquakeMagnitude;
  }
  throw new Error(`Unknown unit key: ${key}`);
}

function getTimeLabelDirection(k) {
  if (k.includes("Next")) {
    return "Next";
  }
  if (k.includes("Prev")) {
    return "Prev.";
  }
  return "";
}

function getTimeLabelDuration(k) {
  if (k.includes("24h")) {
    return "24h";
  }
  if (k.includes("7d")) {
    return "7d";
  }
  return "Now";
}

function getTimeLabelAggregation(k) {
  if (k.includes("Sum")) {
    return "sum";
  }
  if (k.includes("Max")) {
    return "max";
  }
  if (k.includes("Mean")) {
    return "mean";
  }
  return "";
}

function getTimeLabel(k) {
  const duration = getTimeLabelDuration(k);
  const direction = getTimeLabelDirection(k);
  const aggregation = getTimeLabelAggregation(k);
  return `${direction} ${duration} ${aggregation}`.trim();
}

export function newTimedUnit(d, k) {
  const UnitClass = getUnitClass(k);
  return new TimedUnit({
    timeLabel: getTimeLabel(k),
    unitValue: new UnitClass(d[k]),
  });
}
