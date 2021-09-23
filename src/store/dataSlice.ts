import { createSlice } from "@reduxjs/toolkit";

function getTodayString(): string {
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  return String(year) + "-" + String(month) + "-" + String(day);
}

export const dataSlice = createSlice({
  name: "data",
  initialState: { days: {} },
  reducers: {
    increment: (state, action) => {
      //
    },
    newclock: (state, action) => {
      const today: string = getTodayString();
      if (state.days[today]) {
        state.days[today].push(action.payload);
      } else {
        state.days[today] = [action.payload];
      }
        // TODO: save data to local file
    },
  },
});

export const { newclock } = dataSlice.actions;

export default dataSlice.reducer;
