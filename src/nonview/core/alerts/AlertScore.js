export default class AlertScore {
  constructor({ name, description, metricList, timeLabel }) {
    this.name = name;
    this.description = description;
    this.metricList = metricList;
    this.timeLabel = timeLabel;
  }

  get maxScore() {
    return this.metricList.length;
  }

  get score() {
    return this.metricList.filter((metric) => metric.condition(metric.value))
      .length;
  }

  get level() {
    if (this.score === 0) {
      return 0;
    }
    const levelF = (3 * this.score) / this.maxScore;
    if (levelF < 1) {
      return 1;
    }

    return Math.floor(levelF);
  }
}
