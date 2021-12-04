export interface Clock {
  // use string to represent time, avoid Redux problems
  startTime: string;
  endTime: string;
  duration: number;
  taskId?: number;
}
export interface DailyData {
  x: string;
  y: number;
}

// store
export interface UpdateTaskType {
  taskId: number;
  name: string;
  estimationPomodoro: number;
}
export interface AddTaskType {
  name: string;
  estimationPomodoro: number;
}

// states
export interface ConfigState {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  theme: string;
}
export interface ClockState {
  duration: number;
  timenow: number;
  clockRunning: boolean;
}
export interface Day {
  [key: string]: Clock[];
}
export interface Task {
  id: number;
  // name for the task
  name: string;
  // estimation for number of pomodoro needed
  estimationPomodoro: number;
  // actual finished pomodoro by far
  finishedPomodoro: number;
  // notes for the task
  note?: string;
  // linked project id
  projectId?: number;
  /* adapting  */
  finished?: boolean;
}
export interface Project {
  id: number;
  name: string;
  note?: string;
}
export interface DataState {
  days: Day;
  tasks: Task[];
  finishedTasks: Task[];
  projects: Project[];
  // projects: Project[];
  nextTaskId: number;
  nxetProjectId: number;
  selectedTask: number;
}
export interface RootState {
  config: ConfigState;
  clock: ClockState;
  data: DataState;
}
