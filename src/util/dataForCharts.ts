import { useSelector } from "react-redux";
import { RootState } from "../types";

interface DailyData {
  x: string;
  y: number;
}

export function getDaysData() {
  const days = useSelector((state: RootState) => state.data.days);

  const daysdata = new Map();
  for (const day in days) {
    if (daysdata.has(day)) {
      daysdata.set(day, daysdata.get(day) + 1);
    } else {
      daysdata.set(day, 1);
    }
  }

  const res: DailyData[] = [];
  daysdata.forEach((value, key) => {
    res.push({ x: key, y: value });
  });
  return res;
}
