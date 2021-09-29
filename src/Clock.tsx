import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease } from "./store/clockSlice";
import { notify } from "./util";
import ClockOptions from "./components/ClockOptions";
import { Clock as typeClock } from "./types";

export default function Clock() {
  const dispatch = useDispatch();
  const timenow = useSelector((state) => state.clock.timenow);
  const duration = useSelector((state) => state.clock.duration);
  const clockRunning = useSelector((state) => state.clock.clockRunning);
  const selectedTask = useSelector((state) => state.data.selectedTask);

  const [startTime, setStartTime] = useState("");

  function clockStart() {
    dispatch(start());
  }

  function clockPause() {
    dispatch(stop());
  }

  function clockFinished() {
    let endTime = new Date().toString();

    notify("pomodoro finished!");
    dispatch(stop());
    dispatch(reset());
    dispatch(
      newclock({
        startTime,
        endTime,
        duration,
        taskId: selectedTask,
      })
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!clockRunning) return;

      if (timenow == 0) {
        clockFinished();
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

  return (
    <div className="">
      <ClockOptions />
      <div>
        {getTimeMinute(timenow)} : {getTimeSecond(timenow)}
      </div>
      <button
        className="bg-white text-black mr-2"
        onClick={clockRunning ? clockPause : clockStart}
      >
        {clockRunning ? "pause" : "start"}
      </button>
      <button className="bg-white text-black mr-2">jump</button>
    </div>
  );
}
