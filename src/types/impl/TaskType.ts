import type TaskTypeInterface from "../TaskType.interface";

class TaskType implements TaskTypeInterface{
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
                                    updatable: true};
  }
  export default TaskType;