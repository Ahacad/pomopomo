import { createSlice } from "@reduxjs/toolkit";
import { Clock } from "../types";

export const clockSlice = createSlice({
  name: "clock",
  initialState: { duration: 1500, timenow: 1500, clockRunning: false },
  reducers: {
    decrease: (state) => {
      state.timenow -= 1;
    },
    reset: (state) => {
      state.timenow = state.duration;
    },
  },
});

export const { decrease, reset } = clockSlice.actions;

export default clockSlice.reducer;
