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

  static getTimeAgoString(date, now = new Date()) {
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    } else {
      return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
    }
  }

  static compareTimeUtDescending(a, b) {
    return b.timeUt - a.timeUt;
  }

  static getUnixTime() {
    return Math.floor(Date.now() / 1000);
  }

  static formatISO8601(ut) {
    // yyyy-mm-ddThh:mm
    // E.g.: 2023-10-05T14:30
    const date = new Date(ut * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
