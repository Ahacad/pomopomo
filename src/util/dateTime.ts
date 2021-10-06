export function getTodayString(): string {
  /*
   * return uid for today, format is like "2021-09-21"
   */
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1, // getMonth() returns 0~11
    date.getFullYear(),
  ];

  return String(year) + "-" + String(month) + "-" + String(day);
}
