import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clock } from "../types";

function getTodayString(): string {
  /*
   * return uid for today, format is like "2021-09-21"
   */
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  return String(year) + "-" + String(month) + "-" + String(day);
}

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    days: {},
    tasks: [
      { id: 1, name: "Task1", finishedPomodoro: 0 },
      { id: 2, name: "Task2", finishedPomodoro: 0 },
    ],
    projects: {},
    selectedTask: 0,
  },
  reducers: {
    increment: (state, action) => {
      //
    },
    newclock: (state, action: PayloadAction<Clock>) => {
      // TODO: save data to local file
      const today: string = getTodayString();
      if (state.days[today]) {
        state.days[today].push(action.payload);
      } else {
        state.days[today] = [action.payload];
      }
    },
    selectTask: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.selectedTask = 0;
      } else if (action.payload > state.tasks.length) {
        state.selectedTask = 0;
      } else {
        state.selectedTask = action.payload;
      }
    },
  },
});

export const { newclock, selectTask } = dataSlice.actions;

export default dataSlice.reducer;
