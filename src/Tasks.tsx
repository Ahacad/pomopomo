import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectTask } from "./store/dataSlice";

import { RiCheckboxCircleLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Task as taskType } from "./types";

function Config({ clickHandler }) {
  function handleClick(e) {
    e.stopPropagation();
    clickHandler();
  }
  return (
    <button
      className="border-2 hover:bg-gray-300 w-10 pt-1 ml-2 pl-1"
      onClick={handleClick}
    >
      <BsThreeDotsVertical className="" />
    </button>
  );
}
function EditForm() {
    return <div></div>
}

function Task({ data }: { data: taskType }) {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.data.selectedTask);
  function toggleSelect() {
    if (selectedTask === data.id) {
      dispatch(selectTask(0));
    } else {
      dispatch(selectTask(data.id));
    }
  }
  function isSelected(): string {
    if (selectedTask === data.id) {
      return "border-indigo-400 transform translate-y-0.5";
    }
    return "";
  }
  function clickConfig() {
      //
  }

  return (
    <button
      onClick={toggleSelect}
      className={`bg-white w-full text-black flex justify-between p-4 mb-2 rounded-md border-l-8 hover:border-indigo-400 transform ${isSelected()}`}
    >
      <div className="flex">
        <RiCheckboxCircleLine className="mt-2 mr-1" />
        {data.name}
      </div>
      <div className="flex">
        {data.finishedPomodoro} /{" "}
        {data.estimationPomodoro ? data.estimationPomodoro : 0}
        <Config clickHandler={clickConfig} />
      </div>
      <EditForm />
    </button>
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
        <div className="">Add Task</div>
      </div>
    </div>
  );
}
