export default class TimeUtils {
  static parseYYYYMMDD(datePart) {
    const year = Number(datePart.slice(0, 4));
    const month = Number(datePart.slice(4, 6)) - 1;
    const day = Number(datePart.slice(6, 8));
    return Date.UTC(year, month, day) / 1000;
  }

  static parseYYYYMMDDHHHMMSS(dateTimePart) {
    const year = Number(dateTimePart.slice(0, 4));
    const month = Number(dateTimePart.slice(4, 6)) - 1;
    const day = Number(dateTimePart.slice(6, 8));
    const hour = Number(dateTimePart.slice(8, 10));
    const minute = Number(dateTimePart.slice(10, 12));
    const second = Number(dateTimePart.slice(12, 14));
    return Date.UTC(year, month, day, hour, minute, second) / 1000;
  }
}
