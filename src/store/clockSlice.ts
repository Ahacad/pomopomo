import { createSlice } from "@reduxjs/toolkit";
import { Clock } from "../types";

export const clockSlice = createSlice({
  name: "clock",
  initialState: { duration: 5, timenow: 5, clockRunning: false },
  reducers: {
    stop: (state) => {
      state.clockRunning = false;
    },
    start: (state) => {
      state.clockRunning = true;
    },
    decrease: (state) => {
      state.timenow -= 1;
    },
    reset: (state) => {
      state.timenow = state.duration;
    },
  },
});

export const { stop, start, decrease, reset } = clockSlice.actions;

export default clockSlice.reducer;
