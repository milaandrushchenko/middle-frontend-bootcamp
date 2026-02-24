const MS_IN_HOUR = 60 * 60 * 1000; // винесла в константу, бо покращує читабельність і зрозумілість коду

class DateProcessor {
  constructor(date) {
    this.date = this.parseDate(date);
  }

  static parseDate(input) {
    const date = new Date(input);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date;
  }

  static applyOffset(date, hours) {
    return new Date(date.getTime() + hours * MS_IN_HOUR);
  }

  static formatDate(date, { format = "ISO", includeTime = false } = {}) {
    if (includeTime) {
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    // переписала на switch, для кращого читання та без вкладеності if-else
    switch (format) {
      case "ISO":
        return date.toISOString();
      case "UTC":
        return date.toUTCString();
      case "LOCAL":
        return date.toLocaleString();
      default:
        return date.toString();
    }
  }

  // розбила processDateComplex на меньші функції, щоб кожна відповідала за одну задачу - принцип Single Responsibility
  // прибрала inputDate з параметрів, щоб використовувати this.date, який вже є в класі
  processDateComplex(includeTime = false, extraOffset = 0, config = {}) {
    const date = this.date;

    const { offsetHours = 0, format = "ISO" } = config;
    const resultDate = this.applyOffset(date, offsetHours + extraOffset);

    return DateProcessor.formatDate(resultDate, { format, includeTime });
  }

  // винесла в окрему функцію, щоб уникнути дублювання коду - DRY принцип
  getDateParts() {
    const d = this.date;
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return {
      day,
      month,
      year,
    };
  }

  formatDateShort() {
    const { day, month, year } = this.getDateParts();
    return `${day}/${month}/${year}`;
  }

  formatDateLong() {
    const { day, month, year } = this.getDateParts();
    return `${day} - ${month} - ${year}`;
  }

  capitalizeDateString(str) {
    if (typeof str !== "string") return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  isWeekend() {
    const day = this.date.getDay();
    return day === 0 || day === 6;
  }
}
