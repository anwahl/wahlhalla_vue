import type TaskTypeInterface from "../TaskType.interface";
import * as formatter from "@/composables/cellFormatter.js";

class TaskType implements TaskTypeInterface{
  
  formatWord = ((value: String) => {
      return formatter.formatWord(value);
  });

  description =  {label: 'Description',
                                    name: 'description',
                                    type: 'inputText',
                                    required: true,
                                    updatable: true};
  category =  {label: 'Category',
                                    name: 'category',
                                    type: 'inputSelect',
                                    required: true,
                                    items : [{name: 'CHORE'},{name: 'BILL'},{name: 'APPOINTMENT'},{name: 'LIST'},{name: 'OTHER'}],
                                    itemDisplay : 'name',
                                    updatable: true,
                                    formatter: this.formatWord};
  }
  export default TaskType;