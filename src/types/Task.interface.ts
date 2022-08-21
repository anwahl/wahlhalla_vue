import type Property from "./Property";

export default interface Task {
    description: Property;
    type: Property;
    target: Property;
    value?: Property;
  }