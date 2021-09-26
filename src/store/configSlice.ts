import { createSlice } from "@reduxjs/toolkit";
import { ClockConfiguration } from "../types";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    pomodoroDuration: 1500,
    shortBreakDuration: 180,
    longBreakDuration: 900,
  },
  reducers: {},
});

export const {} = configSlice.actions;

export default configSlice.reducer;
