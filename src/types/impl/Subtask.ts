import type SubtaskInterface from "../Subtask.interface";
import GET from "@/composables/GET";

export default class Subtask implements SubtaskInterface{
    constructor (id: any) {
        this.assignedTask.value = id;
        this.setAssignedTaskItems();
    }
    description = {label: 'Description',
                    name: 'description',
                    type: 'inputText',
                    required: true,
                    updatable: true};
    assignedTask = {label: 'Assigned Task',
                    name: 'assignedTaskId',
                    type: 'inputSelect',
                    required: true,
                    items : undefined,
                    itemDisplay : 'description',
                    itemSubOf: 'task',
                    value: undefined,
                    subOf: 'task',
                    subOfSub: 'assignedTask',
                    updatable: true};
             
    private setAssignedTaskItems = async () => await GET("assignedTask").then(result =>{this.assignedTask.items = result;});
}

