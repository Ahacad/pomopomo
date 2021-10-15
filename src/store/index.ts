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

const loadedState = loadState();
if (loadedState != undefined) {
  loadedState.clock.clockRunning = false;
}

// adapt to previous version of stores
if (loadedState.data.finishedTasks === undefined) {
  loadedState.data.finishedTasks = [];
}
for (const task of loadedState.data.tasks) {
  task.finished = false;
}
for (const task of loadedState.data.finishedTasks) {
  task.finished = true;
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
