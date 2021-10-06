import { useSelector } from "react-redux";
import { RootState } from "../types";
import { DailyData } from "../types";

export function getDaysData() {
  // get days data for vivo, example format: [{ x: "2021-10-10", y: 10 }]
  const days = useSelector((state: RootState) => state.data.days);

  console.log("HELLO", days);
  const daysdata = new Map();
  for (const day in days) {
    daysdata.set(day, days[day].length);
  }

  const res: DailyData[] = [];
  daysdata.forEach((value, key) => {
    res.push({ x: key, y: value });
  });

  // TODO: handle problems:
  // 1. data less then some amount (say 15 days)
  // 2. data loss in between recorded days (say 2021-09-01 and 2021-09-20)
  // i.e. needs data padding

  return res;
}
