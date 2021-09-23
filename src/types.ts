
export interface Day {
    clocks: Clock[];
}
export interface Days {
    days: Day[];
}

export interface Clock {
    startTime: Date;
    endTime: Date;
}
