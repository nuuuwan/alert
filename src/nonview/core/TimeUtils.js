export default class TimeUtils {
  // Sri Lanka timezone offset: UTC+5:30 (19800 seconds)
  static SRI_LANKA_OFFSET_SECONDS = 5.5 * 3600;

  static parseYYYYMMDD(datePart) {
    const year = Number(datePart.slice(0, 4));
    const month = Number(datePart.slice(4, 6)) - 1;
    const day = Number(datePart.slice(6, 8));
    // Convert from Sri Lanka time to UTC by subtracting the offset
    return Date.UTC(year, month, day) / 1000 - this.SRI_LANKA_OFFSET_SECONDS;
  }

  static parseYYYYMMDDHHHMMSS(dateTimePart) {
    const year = Number(dateTimePart.slice(0, 4));
    const month = Number(dateTimePart.slice(4, 6)) - 1;
    const day = Number(dateTimePart.slice(6, 8));
    const hour = Number(dateTimePart.slice(8, 10));
    const minute = Number(dateTimePart.slice(10, 12));
    const second = Number(dateTimePart.slice(12, 14));
    // Convert from Sri Lanka time to UTC by subtracting the offset
    return (
      Date.UTC(year, month, day, hour, minute, second) / 1000 -
      this.SRI_LANKA_OFFSET_SECONDS
    );
  }
}
