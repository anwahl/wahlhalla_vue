export default interface AssignedTask {
    id: null;
    person: number;
    task: number;
    type: string;
    timeOfDay: Date;
    endTimeOfDay: Date;
    dueDate: Date;
    ocurrences: Number;
    complete: boolean;
  }