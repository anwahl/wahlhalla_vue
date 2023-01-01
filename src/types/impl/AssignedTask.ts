import type AssignedTaskInterface from "../AssignedTask.interface";
import GET from "@/composables/GET";
import * as formatter from "@/composables/cellFormatter.js";

export default class AssignedTask implements AssignedTaskInterface{
    constructor (onDate?: any) {
        this.dueDate.value = onDate;
        this.setTaskItems();
        this.setPersonItems();
    }
 
    formatTime = ((value: String) => {
        return formatter.formatTime(value);
    });
    formatDate = ((value: String) => {
        return formatter.formatDate(value);
    });
    formatWord = ((value: String) => {
        return formatter.formatWord(value);
    });
    formatCompletion = ((value: Boolean) => {
        if (value) {
            return "Complete";
        } else {
            return "Incomplete";
        }
    });

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
        itemSubOfSub : 'target',
        itemSubDisplay : 'description',
        required: true,
        updatable: true};
    type = {label: 'Type',
        name: 'type',
        type: 'inputSelect',
        items : [{name: 'DAILY'},{name: 'WEEKLY'},{name: 'BIWEEKLY'},{name: 'MONTHLY'},{name: 'YEARLY'},{name: 'STANDALONE'}],
        itemDisplay : 'name',
        required: true,
        updatable: false,
        formatter: this.formatWord};
    dueDate = {label: 'Due Date',
        name: 'dueDate',
        type: 'inputDate',
        required: true,
        value: undefined,
        updatable: false,
        formatter: this.formatDate};
    timeOfDay = {label: 'Start Time',
        name: 'timeOfDay',
        type: 'inputTime',
        required: false,
        updatable: true,
        formatter: this.formatTime};
    endTimeOfDay = {label: 'End Time',
        name: 'endTimeOfDay',
        type: 'inputTime',
        required: false,
        updatable: true,
        formatter: this.formatTime};
    occurrences = {label: 'Occurrences',
        name: 'occurrences',
        type: 'inputNumber',
        required: false,
        updatable: false};
    complete = {label: 'Complete',
        name: 'complete',
        type: 'inputCheck',
        required: false,
        updatable: true,
        formatter: this.formatCompletion}; 

    setTaskItems = async () => await GET("task").then(result =>{this.task.items = result;});
    setPersonItems = async () => await GET("person").then(result =>{this.person.items = result;});
   
}
