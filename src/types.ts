export interface Day {
  clocks: Clock[];
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
export interface Days {
  days: Day[];
  tasks: Task[];
  projects: Project[];
}

export interface Clock {
  startTime: Date;
  endTime: Date;
  duration: number;
}

export interface ClockConfiguration {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
