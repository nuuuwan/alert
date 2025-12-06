export default class ArrayUtils {
  static sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  }
}
