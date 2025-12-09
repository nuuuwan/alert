export default class ArrayUtils {
  static sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  }

  static max(arr) {
    return arr.reduce((maxVal, val) => (val > maxVal ? val : maxVal), arr[0]);
  }

  static mean(arr) {
    if (arr.length === 0) return 0;
    return this.sum(arr) / arr.length;
  }
}
