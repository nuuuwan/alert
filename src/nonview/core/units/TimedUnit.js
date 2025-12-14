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
  constructor({
    UnitClass,
    value,
    timeLabelDirection,
    timedLabelDuration,
    timeLabelAggregation,
  }) {
    this.UnitClass = UnitClass;
    this.value = value;
    this.timeLabelDirection = timeLabelDirection;
    this.timedLabelDuration = timedLabelDuration;
    this.timeLabelAggregation = timeLabelAggregation;
  }

  get unitValue() {
    return new this.UnitClass(this.value);
  }

  get timeLabel() {
    let parts = [];
    if (this.timeLabelDirection) {
      parts.push(this.timeLabelDirection);
    }
    if (this.timedLabelDuration) {
      parts.push(this.timedLabelDuration);
    }
    if (this.timeLabelAggregation) {
      parts.push(this.timeLabelAggregation);
    }
    return parts.join(" ").trim();
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
    return "next";
  }
  if (k.includes("Prev")) {
    return "prev.";
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
  return "now";
}

function getTimeLabelAggregation(k) {
  if (k.includes("Sum")) {
    return "sum";
  }
  if (k.includes("Max")) {
    return "max";
  }
  if (k.includes("Min")) {
    return "min";
  }
  if (k.includes("Mean")) {
    return "mean";
  }
  return "";
}

export function newTimedUnit(d, k) {
  const UnitClass = getUnitClass(k);
  const timeLabelDirection = getTimeLabelDirection(k);
  const timedLabelDuration = getTimeLabelDuration(k);
  const timeLabelAggregation = getTimeLabelAggregation(k);
  return new TimedUnit({
    UnitClass,
    value: d[k],
    timeLabelDirection,
    timedLabelDuration,
    timeLabelAggregation,
  });
}
