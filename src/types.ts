export interface Day {
  [key: string]: Clock[];
}
export interface Task {
  id: number;
  // name for the task
  name: string;
  // estimation for number of pomodoro needed
  estimationPomodoro?: number;
  // actual finished pomodoro by far
  finishedPomodoro?: number;
  // notes for the task
  note?: string;
  // linked project id
  projectId?: number;
}
export interface Project {
  id: number;
}
export interface Data {
  days: Day;
  tasks: Task[];
  projects: Project[];
}

export interface Clock {
    // use string to represent time, avoid Redux problems
  startTime: string;
  endTime: string;
  duration: number;
  taskId?: number;
}

export interface ClockConfiguration {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
