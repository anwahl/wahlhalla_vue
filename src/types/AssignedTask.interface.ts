import type Property from "./Property";

export default interface AssignedTask {
    person: Property;
    task: Property;
    type: Property;
    timeOfDay: Property;
    endTimeOfDay: Property;
    dueDate: Property;
    occurrences: Property;
    complete: Property;
  }