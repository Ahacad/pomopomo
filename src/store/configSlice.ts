import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClockConfiguration } from "../types";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    pomodoroDuration: 1500,
    shortBreakDuration: 180,
    longBreakDuration: 900,
    theme: "pomodoro",
  },
  reducers: {
    changeTheme: (state, action) => {
      if (action.payload == "pomodoro") {
        state.theme = "pomodoro";
      } else if (action.payload == "shortbreak") {
        state.theme = "shortbreak";
      } else if (action.payload == "longbreak") {
        state.theme = "longbreak";
      }
    },
  },
});

export const { changeTheme } = configSlice.actions;

export default configSlice.reducer;
