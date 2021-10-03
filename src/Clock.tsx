import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease } from "./store/clockSlice";
import { notify } from "./util";
import ClockOptions from "./components/ClockOptions";
import { RootState } from "./types";

export default function Clock() {
  const dispatch = useDispatch();
  const timenow = useSelector((state: RootState) => state.clock.timenow);
  const duration = useSelector((state: RootState) => state.clock.duration);
  const clockRunning = useSelector(
    (state: RootState) => state.clock.clockRunning
  );
  const selectedTask = useSelector(
    (state: RootState) => state.data.selectedTask
  );
  const theme = useSelector((state: RootState) => state.config.theme);

  const [startTime, setStartTime] = useState("");

  function clockStart() {
    dispatch(start());
  }

  function clockPause() {
    dispatch(stop());
  }

  function clockFinished(recordClock: boolean) {
    let endTime = new Date().toString();

    notify("pomodoro finished!");
    dispatch(stop());
    dispatch(reset());

    if (theme === "pomodoro" && recordClock) {
      dispatch(
        newclock({
          startTime,
          endTime,
          duration,
          taskId: selectedTask,
        })
      );
    }
    // TODO: maybe record rest also
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!clockRunning) return;

      if (timenow == 0) {
        clockFinished(true);
        return;
      }

      // pomodoro starting
      if (timenow == duration) {
        setStartTime(new Date().toString());
      }
      dispatch(decrease());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  function getTimeMinute(timenow: number) {
    const oristr = String(Math.floor(timenow / 60));
    if (oristr.length == 1) {
      return "0" + oristr;
    } else {
      return oristr;
    }
  }
  function getTimeSecond(timenow: number) {
    const oristr = String(timenow - 60 * Math.floor(timenow / 60));
    if (oristr.length == 1) {
      return "0" + oristr;
    } else {
      return oristr;
    }
  }

  function handleSkip() {
    if (
      window.confirm(
        "Are you sure to skip this clock? (This one won't be counted as pomodoro in the report)"
      )
    ) {
      clockFinished(false);
    }
  }

  return (
    <div className="">
      <ClockOptions />
      <div>
        {getTimeMinute(timenow)} : {getTimeSecond(timenow)}
      </div>
      <button
        className="bg-white text-black mr-2 p-2 rounded-lg"
        onClick={clockRunning ? clockPause : clockStart}
      >
        {clockRunning ? "pause" : "start"}
      </button>
      <button
        className="bg-white text-black mr-2 p-2 rounded-lg"
        onClick={handleSkip}
      >
        jump
      </button>
    </div>
  );
}
