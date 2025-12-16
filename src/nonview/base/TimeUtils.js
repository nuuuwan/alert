export default class TimeUtils {
  // Sri Lanka timezone offset: UTC+5:30 (19800 seconds)
  static SRI_LANKA_OFFSET_SECONDS = 5.5 * 3600;

  static SECONDS_IN = {
    MINUTE: 60,
    HOUR: 60 * 60,
    DAY: 60 * 60 * 24,
    WEEK: 60 * 60 * 24 * 7,
  };

  static formatMMMDD(date) {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  static formatMMMDDIImmp(date) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  }

  static formatIImmp(date) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

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

  static getTimeAgoString(ut, utNow = null) {
    const diffSeconds = Math.floor((utNow || TimeUtils.getUnixTime()) - ut);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const days = diffDays > 0 ? `${diffDays}d` : "";
    const hours = diffHours % 24 > 0 ? `${diffHours % 24}h` : "";
    const minutes = diffMinutes % 60 > 0 ? `${diffMinutes % 60}m` : "";

    return [days, hours, minutes].filter(Boolean).join("") + " ago";
  }

  static compareTimeUtDescending(a, b) {
    return b.timeUt - a.timeUt;
  }

  static getUnixTimeFromDate(date) {
    return Math.floor(date.getTime() / 1000);
  }

  static getUnixTime() {
    return this.getUnixTimeFromDate(new Date());
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

  static sleep(seconds) {
    return new Promise((resolve) =>
      setTimeout(resolve, parseInt(seconds * 1000))
    );
  }
}
