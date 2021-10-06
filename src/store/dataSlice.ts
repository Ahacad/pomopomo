import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AddTaskType, Clock, DataState, UpdateTaskType } from "../types";

function getTodayString(): string {
  /*
   * return uid for today, format is like "2021-09-21"
   */
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  return String(year) + "-" + String(month) + "-" + String(day);
}

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

const initialState: DataState = {
  days: {},
  tasks: [
    { id: 1, name: "Task1", finishedPomodoro: 0, estimationPomodoro: 0 },
    { id: 2, name: "Task2", finishedPomodoro: 0, estimationPomodoro: 0 },
  ],
  selectedTask: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      //
    },
    newclock: (state, action: PayloadAction<Clock>) => {
      // TODO: save data to local file
      const today: string = getTodayString();
      if (
        getKeyValue<keyof DataState["days"], DataState["days"]>(today)(
          state.days
        )
      ) {
        getKeyValue<keyof DataState["days"], DataState["days"]>(today)(
          state.days
        ).push(action.payload);
      } else {
        // FIXME: element implicitly has an any type because expression
        // of type 'string' can't be used to index type
        // WritableDraft<{}>

        // @ts-ignore
        state.days[today] = [action.payload];
      }

      if (action.payload.taskId) {
        state.tasks.forEach((task) => {
          // TODO: implement binary search
          if (task.id === action.payload.taskId) {
            task.finishedPomodoro += 1;
          }
        });
      }
    },
    newTask: (state, action: PayloadAction<AddTaskType>) => {
      // TODO: mantain max id as state
      const taskMaxId =
        state.tasks.reduce((prev, curr) => {
          return Math.max(prev, curr.id);
        }, 0) + 1;
      state.tasks.push({
        id: taskMaxId,
        finishedPomodoro: 0,
        name: action.payload.name,
        estimationPomodoro: action.payload.estimationPomodoro,
      });
    },
    selectTask: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.selectedTask = 0;
      } else if (action.payload > state.tasks.length) {
        state.selectedTask = 0;
      } else {
        state.selectedTask = action.payload;
      }
    },
    updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
      if (action.payload.taskId) {
        state.tasks.forEach((task) => {
          if (task.id === action.payload.taskId) {
            task.name = action.payload.name;
            task.estimationPomodoro = action.payload.estimationPomodoro;
          }
        });
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const originTasks = state.tasks;
      let idx = originTasks.length;
      for (const [index, task] of state.tasks.entries()) {
        if (index === action.payload) {
          idx = index;
          return;
        }
      }
      console.log(originTasks);
      console.log([
        ...originTasks.slice(0, idx),
        ...originTasks.slice(idx + 1),
      ]);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      // state.tasks = [
      //...originTasks.slice(0, idx),
      //...originTasks.slice(idx + 1),
      //];
    },
  },
});

export const { newclock, newTask, selectTask, updateTask, deleteTask } =
  dataSlice.actions;

export default dataSlice.reducer;
