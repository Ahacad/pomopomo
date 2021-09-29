import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease } from "./store/clockSlice";
import { notify } from "./util";

import { RiCheckboxCircleLine } from "react-icons/ri";

function Task() {
  return (
    <div className="bg-white w-full text-black flex">
      <div className="flex">
        <RiCheckboxCircleLine />
        TASK
      </div>
    </div>
  );
}

export default function Tasks() {
  return (
    <div className="">
      <div className="w-96">
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}
