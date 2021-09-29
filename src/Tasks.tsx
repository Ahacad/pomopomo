import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { stop, start, reset, decrease } from "./store/clockSlice";
import { notify } from "./util";

import { RiCheckboxCircleLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Task as taskType } from "./types";

function Task({ data }: { data: taskType }) {
  return (
    <div className="bg-white w-full text-black flex justify-between p-4 mb-2 rounded-md">
      <div className="flex">
        <RiCheckboxCircleLine />
        {data.name}
      </div>
      <div className="flex">
        {data.finishedPomodoro} /{" "}
        {data.estimationPomodoro ? data.estimationPomodoro : 0}
        <BsThreeDotsVertical />
      </div>
    </div>
  );
}

export default function Tasks() {
  const tasks = useSelector((state) => state.data.tasks);

  return (
    <div className="">
      <div className="w-96 mt-10">
        {tasks.map((task: taskType) => (
          <Task data={task} />
        ))}
      </div>
    </div>
  );
}
