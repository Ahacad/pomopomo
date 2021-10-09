import React, { useState, useEffect } from "react";
import { newclock } from "./store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectTask, updateTask, newTask, deleteTask } from "./store/dataSlice";

import { RiCheckboxCircleLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Task as taskType, RootState } from "./types";

function Config({ clickHandler }: { clickHandler: () => void }) {
  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
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
function EditForm({
  taskData,
  cancelHandler,
  deleteHandler,
}: {
  taskData: taskType;
  cancelHandler: () => void;
  deleteHandler: () => void;
}) {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(taskData.name);
  const [estimation, setEstimation] = useState(taskData.estimationPomodoro);

  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
  const handleEstimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimation(parseInt(event.target.value, 10));
  };
  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    cancelHandler();
  };
  const handleDelete = (event: React.MouseEvent) => {
    deleteHandler();
  };
  const handleSave = (event: React.MouseEvent) => {
    dispatch(
      updateTask({
        taskId: taskData.id,
        name: taskName,
        estimationPomodoro: estimation,
      })
    );
  };

  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="task"
          >
            Task Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            id="task"
            type="text"
            value={taskName}
            onChange={handleTaskName}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="estimation"
          >
            Estimate Round
          </label>
          <input
            className="shadow appearance-none border border rounded w-3/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-sm "
            id="estimation"
            type="number"
            value={estimation || ""}
            onChange={handleEstimation}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="text-white bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="text-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function Task({ taskData }: { taskData: taskType }) {
  const dispatch = useDispatch();
  const selectedTask = useSelector(
    (state: RootState) => state.data.selectedTask
  );
  const [showEditForm, setShowEditForm] = useState(false);

  function toggleSelect() {
    if (selectedTask === taskData.id) {
      dispatch(selectTask(0));
    } else {
      dispatch(selectTask(taskData.id));
    }
  }
  function isSelected(): string {
    if (selectedTask === taskData.id) {
      return "border-indigo-400 transform translate-y-0.5";
    }
    return "";
  }
  function clickConfig() {
    if (showEditForm) {
      setShowEditForm(false);
    } else {
      setShowEditForm(true);
    }
  }
  function handleCancelEdit() {
    clickConfig();
  }
  function handleDelete() {
    if (window.confirm("are you sure to delete this task?")) {
      dispatch(deleteTask(taskData.id));
    }
  }

  return (
    <>
      <button
        onClick={toggleSelect}
        className={`bg-white w-full text-black flex justify-between p-4 mb-2 rounded-md border-l-8 hover:border-indigo-400 transform ${isSelected()}`}
      >
        <div className="flex">
          <RiCheckboxCircleLine className="mt-2 mr-1" />
          {taskData.name}
        </div>
        <div className="flex">
          {taskData.finishedPomodoro} /{" "}
          {taskData.estimationPomodoro ? taskData.estimationPomodoro : 0}
          <Config clickHandler={clickConfig} />
        </div>
      </button>
      {showEditForm ? (
        <EditForm
          taskData={taskData}
          cancelHandler={handleCancelEdit}
          deleteHandler={handleDelete}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function AddTask() {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [estimation, setEstimation] = useState(1);
  const handleAddTask = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAddTask(false);
  };
  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAddTask(true);
  };
  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setTaskName(event.target.value);
  };
  const handleEstimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimation(Number(event.target.value));
  };
  const handleClickAdd = (event: React.MouseEvent) => {
    if (taskName === "") {
      alert("task name cannot be empty!");
      return;
    }
    dispatch(
      newTask({
        name: taskName,
        estimationPomodoro: estimation,
      })
    );
    setTaskName("");
    setEstimation(0);
  };
  return (
    <>
      {showAddTask ? (
        <div
          className="h-12 bg-black opacity-10 hover:opacity-20 py-1 rounded-md cursor-pointer"
          onClick={handleAddTask}
        >
          <div className="relative top-1/2 transform -translate-y-1/2 text-base text-white flex justify-center">
            <div className="flex">
              <HiOutlinePlusCircle className="mt-1 mr-2" /> Add Task
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="task"
              >
                New Task
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="task"
                type="text"
                value={taskName}
                onChange={handleTaskName}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estimation"
              >
                Estimation
              </label>
              <input
                className="shadow appearance-none border border rounded w-3/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-sm "
                id="estimation"
                type="number"
                value={estimation || ""}
                onChange={handleEstimation}
              />
            </div>
            <div className="flex items-center justify-between">
              <div></div>
              <button
                className="text-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                onClick={handleClickAdd}
                type="button"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.data.tasks);

  return (
    <div className="">
      <div className="w-96 mt-10">
        {tasks.map((task: taskType) => (
          <Task key={task.id} taskData={task} />
        ))}
        <AddTask />
      </div>
    </div>
  );
}
