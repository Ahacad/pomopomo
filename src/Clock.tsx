import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease, setTimenow } from "./store/clockSlice";
import { notify } from "./util";
import ClockOptions from "./components/ClockOptions";
import { RootState } from "./types";

export default function Clock() {
  Notification.requestPermission();
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

  const [pauseStartTime, setPauseStartTime] = useState("");
  const [startTime, setStartTime] = useState("");

  function clockStart() {
    if (timenow === duration) {
      setStartTime(new Date().toString());
    }
    setPauseStartTime(new Date().toString());
    dispatch(start());
  }

  function clockPause() {
    dispatch(stop());
  }

  async function clockFinished(recordClock: boolean) {
    let endTime = new Date().toString();

    notify("pomodoro finished!");
    dispatch(reset());
    clockPause();

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

      if (timenow <= 0) {
        clockFinished(true);
        return;
      }
      const now = new Date();

      let finished = Math.floor(
        (now.getTime() - new Date(pauseStartTime).getTime()) / 1000
      );
      dispatch(decrease(finished));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  function getTimeMinute(timenow: number) {
    timenow = Math.ceil(timenow);
    const oristr = String(Math.floor(timenow / 60));
    if (oristr.length == 1) {
      return "0" + oristr;
    } else {
      return oristr;
    }
  }
  function getTimeSecond(timenow: number) {
    timenow = Math.ceil(timenow);
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
      clockFinished(true);
    }
  }

  document.title = `pomopomo ${getTimeMinute(timenow)} : ${getTimeSecond(
    timenow
  )}`;

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
