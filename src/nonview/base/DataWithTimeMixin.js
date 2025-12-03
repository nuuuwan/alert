const DataWithTimeMixin = {
  getDate() {
    return new Date(this.timeUt * 1000);
  },
};

export default DataWithTimeMixin;
