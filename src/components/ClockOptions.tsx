import React, { useState } from "react";
import { changeTheme as storeChangeTheme } from "../store/configSlice";
import { useDispatch } from "react-redux";

export default function ClockOptions() {
  const dispatch = useDispatch();

  function changeTheme(themeId: number) {
    if (themeId === 1) {
      dispatch(storeChangeTheme("pomodoro"));
    } else if (themeId === 2) {
      dispatch(storeChangeTheme("shortbreak"));
    } else if (themeId === 3) {
      dispatch(storeChangeTheme("longbreak"));
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
    </div>
  );
}
