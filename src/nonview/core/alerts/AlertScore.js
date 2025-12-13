export default class AlertScore {
  constructor(metricList) {
    this.metricList = metricList;
  }

  get maxScore() {
    return this.metricList.length;
  }

  get score() {
    return this.metricList.filter((metric) => metric.condition(metric.value))
      .length;
  }
}
