import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease } from "./store/clockSlice";
import { notify } from "./util";
import ClockOptions from "./components/ClockOptions";

function Task() {
  return <div></div>;
}

export default function Tasks() {
  return (
    <div className="">
      <div>
        <div className="bg-white w-36 text-black">tasks1</div>
        <div className="bg-white w-36 text-black">task2</div>
      </div>
    </div>
  );
}
