export interface Day {
  clocks: Clock[];
}
export interface Task {
  id: number;
  name: string;
  estimation: number;
  note: string;
  projectId: number;
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
