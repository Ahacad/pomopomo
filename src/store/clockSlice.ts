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
    setDuration: (state, action) => {
      if (typeof action.payload === "number" && action.payload) {
        state.duration = action.payload;
        state.timenow = state.duration;
        state.clockRunning = false;
      }
    },
  },
});

export const { stop, start, decrease, reset, setDuration } = clockSlice.actions;

export default clockSlice.reducer;
