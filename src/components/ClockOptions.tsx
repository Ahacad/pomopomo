import React, { useState } from "react";
import { changeTheme as storeChangeTheme } from "../store/configSlice";
import { setDuration } from "../store/clockSlice";

import { useDispatch, useSelector } from "react-redux";

export default function ClockOptions() {
  const dispatch = useDispatch();
  const pomodoroDuration = useSelector(
    (state) => state.config.pomodoroDuration
  );
  const shortBreakDuration = useSelector(
    (state) => state.config.shortBreakDuration
  );
  const longBreakDuration = useSelector(
    (state) => state.config.longBreakDuration
  );

  function changeTheme(themeId: number) {
    if (themeId === 1) {
      dispatch(storeChangeTheme("pomodoro"));
      dispatch(setDuration(pomodoroDuration));
    } else if (themeId === 2) {
      dispatch(storeChangeTheme("shortbreak"));
      dispatch(setDuration(shortBreakDuration));
    } else if (themeId === 3) {
      dispatch(storeChangeTheme("longbreak"));
      dispatch(setDuration(longBreakDuration));
    } else if (themeId === 4) {
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
