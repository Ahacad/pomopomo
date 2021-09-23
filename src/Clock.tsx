import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Clock() {
  const [alltime, setAlltime] = useState(1500);
  const [timenow, setTimenow] = useState(1500);
  const [clockrunning, setClockrunning] = useState(false);

  let startTime: Date, endTime: Date;

  function clockStart() {
    setClockrunning(true);
  }

  function clockPause() {
    setClockrunning(false);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!clockrunning) return;
      // TODO: when time counts down over,
      // push newclock to data,
      if (timenow == 0) {
        endTime = new Date();

        setClockrunning(false);
        setTimenow(alltime);
        return;
      }

      if (timenow == alltime) {
        startTime = new Date();
      }
      setTimenow(timenow - 1);
    }, 1000);
    return () => clearTimeout(timer);
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
      <div>
        {getTimeMinute()} : {getTimeSecond()}
      </div>
      <button className="bg-white text-black mr-2" onClick={clockStart}>
        start
      </button>
      <button className="bg-white text-black mr-2" onClick={clockPause}>
        pause
      </button>
      <button className="bg-white text-black mr-2">jump</button>
    </div>
  );
}
