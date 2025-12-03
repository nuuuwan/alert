const DataWithTimeMixin = {
  get date() {
    return new Date(this.timeUt * 1000);
  },
};

export default DataWithTimeMixin;
