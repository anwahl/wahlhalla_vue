import type AssignedTaskInterface from "../AssignedTask.interface";
import GET from "@/composables/GET";

export default class AssignedTask implements AssignedTaskInterface{
    constructor (onDate?: any) {
        this.dueDate.value = onDate;
        this.setTaskItems();
        this.setPersonItems();
    }

    person = {label: 'Assigned Person',
        name: 'personId',
        type: 'inputSelect',
        items : undefined,
        itemDisplay : 'firstName',
        subOf: 'person',
        required: false,
        updatable: true};
    task = {label: 'Task',
        name: 'taskId',
        type: 'inputSelect',
        subOf: 'task',
        items : undefined,
        itemDisplay : 'description',
        required: true,
        updatable: true};
    type = {label: 'Type',
        name: 'type',
        type: 'inputSelect',
        items : [{name: 'DAILY'},{name: 'WEEKLY'},{name: 'MONTHLY'},{name: 'YEARLY'},{name: 'STANDALONE'}],
        itemDisplay : 'name',
        required: true,
        updatable: false};
    dueDate = {label: 'Due Date',
        name: 'dueDate',
        type: 'inputDate',
        required: true,
        value: undefined,
        updatable: false};
    timeOfDay = {label: 'Start Time',
        name: 'timeOfDay',
        type: 'inputTime',
        required: false,
        updatable: true};
    endTimeOfDay = {label: 'End Time',
        name: 'endTimeOfDay',
        type: 'inputTime',
        required: false,
        updatable: true};
    occurrences = {label: 'Occurrences',
        name: 'occurrences',
        type: 'inputNumber',
        required: false,
        updatable: false};
    complete = {label: 'Complete',
        name: 'complete',
        type: 'inputCheck',
        required: false,
        updatable: true}; 

    setTaskItems = async () => await GET("task").then(result =>{this.task.items = result;});
    setPersonItems = async () => await GET("person").then(result =>{this.person.items = result;});
}
