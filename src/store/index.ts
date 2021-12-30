import { configureStore } from "@reduxjs/toolkit";

import clockReducer from "./clockSlice";
import configReducer from "./configSlice";
import dataReducer from "./dataSlice";

type RootState = ReturnType<typeof store.getState>;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

// load state saevd in localStorage and forward adapt
const loadedState = loadState();
if (loadedState != undefined) {
  // stop running pomodoro
  loadedState.clock.clockRunning = false;

  // adapt to previous version of stores
  if (loadedState.data.finishedTasks === undefined) {
    loadedState.data.finishedTasks = [];
  }
  for (const task of loadedState.data.tasks) {
    task.finished = false;
    if (task.note === undefined) {
      task.note = "";
    }
  }
  for (const task of loadedState.data.finishedTasks) {
    task.finished = true;
    if (task.note === undefined) {
      task.note = "";
    }
  }

  if (loadedState.data.nextTaskId === undefined) {
    loadedState.data.nextTaskId = 0;
    for (const task of loadedState.data.tasks) {
      loadedState.data.nextTaskId = Math.max(
        loadedState.data.nextTaskId,
        task.id
      );
    }
    for (const task of loadedState.data.finishedTasks) {
      loadedState.data.nextTaskId = Math.max(
        loadedState.data.nextTaskId,
        task.id
      );
    }
    loadedState.data.nextTaskId += 1;
  }
}
console.log(loadedState);

const store = configureStore({
  reducer: {
    data: dataReducer,
    clock: clockReducer,
    config: configReducer,
  },
  preloadedState: loadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
