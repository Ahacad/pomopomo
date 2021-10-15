import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AddTaskType, Clock, DataState, Task, UpdateTaskType } from "../types";
import { getTodayString } from "../util/dateTime";

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
  finishedTasks: [],
  selectedTask: 0,
  nextTaskId: 3,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
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
      state.tasks.push({
        id: state.nextTaskId,
        finishedPomodoro: 0,
        name: action.payload.name,
        estimationPomodoro: action.payload.estimationPomodoro,
      });
      state.nextTaskId += 1;
    },
    finishTask: (state, action: PayloadAction<number>) => {
      let finishedTask: Task[] = [];
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === action.payload) {
          finishedTask = state.tasks.splice(i, 1);
          break;
        }
      }
      finishedTask[0].finished = true;
      state.finishedTasks.push(finishedTask[0]);
    },
    unfinishTask: (state, action: PayloadAction<number>) => {
      let unfinishedTask: Task[] = [];
      for (let i = 0; i < state.finishedTasks.length; i++) {
        if (state.finishedTasks[i].id === action.payload) {
          unfinishedTask = state.finishedTasks.splice(i, 1);
          break;
        }
      }
      unfinishedTask[0].finished = false;
      state.tasks.push(unfinishedTask[0]);
    },
    selectTask: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
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
      /*
       *console.log(originTasks);
       *console.log([
       *  ...originTasks.slice(0, idx),
       *  ...originTasks.slice(idx + 1),
       *]);
       */
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  newclock,
  newTask,
  selectTask,
  updateTask,
  deleteTask,
  finishTask,
  unfinishTask,
} = dataSlice.actions;

export default dataSlice.reducer;
