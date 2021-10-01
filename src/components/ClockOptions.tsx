import React, { useState } from "react";
import { changeTheme as storeChangeTheme } from "../store/configSlice";
import { setDuration } from "../store/clockSlice";

import { useDispatch, useSelector } from "react-redux";

export default function ClockOptions() {
  const dispatch = useDispatch();
  const pomodoroDuration = useSelector(
    (state) => state.config.pomodoroDuration
  );
  const clockRunning = useSelector((state) => state.clock.clockRunning);
  const currentTheme = useSelector((state) => state.config.theme);
  const shortBreakDuration = useSelector(
    (state) => state.config.shortBreakDuration
  );
  const longBreakDuration = useSelector(
    (state) => state.config.longBreakDuration
  );

  // FIXME: use map rather than if else
  function getCurrentThemeId() {
    if (currentTheme === "pomodoro") {
      return 1;
    } else if (currentTheme === "shortbreak") {
      return 2;
    } else if (currentTheme === "longbreak") {
      return 3;
    }
  }
  function changeTheme(themeId: number) {
    if (themeId === getCurrentThemeId()) {
      return;
    }
    if (
      themeId === 1 &&
      (!clockRunning || confirm("are you sure to switch?"))
    ) {
      dispatch(storeChangeTheme("pomodoro"));
      dispatch(setDuration(pomodoroDuration));
    } else if (
      themeId === 2 &&
      (!clockRunning || confirm("are you sure to switch?"))
    ) {
      dispatch(storeChangeTheme("shortbreak"));
      dispatch(setDuration(shortBreakDuration));
    } else if (
      themeId === 3 &&
      (!clockRunning || confirm("are you sure to switch?"))
    ) {
      dispatch(storeChangeTheme("longbreak"));
      dispatch(setDuration(longBreakDuration));
    } else if (
      themeId === 4 &&
      (!clockRunning || confirm("are you sure to switch?"))
    ) {
      dispatch(storeChangeTheme("pomodoro"));
      dispatch(setDuration(5));
    }
  }
  return (
    <div>
      <button className="bg-white text-black" onClick={() => changeTheme(1)}>
        Pomodoro
      </button>
      <button className="bg-white text-black" onClick={() => changeTheme(2)}>
        Short Break
      </button>
      <button className="bg-white text-black" onClick={() => changeTheme(3)}>
        Long Break
      </button>
      <button className="bg-white text-black" onClick={() => changeTheme(4)}>
        TEST
      </button>
    </div>
  );
}
