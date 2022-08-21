import type TaskInterface from "../Task.interface";
import GET from "@/composables/GET";

export default class Task implements TaskInterface{
    constructor () {
        this.setTypeItems();
        this.setTargetItems();
    }
    description = {label: 'Description',
                    name: 'description',
                    type: 'inputText',
                    required: true,
                    updatable: true};
    type = {label: 'Type',
                    name: 'typeId',
                    type: 'inputSelect',
                    required: true,
                    items : undefined,
                    itemDisplay : 'description',
                    updatable: true,
                    subOf: 'taskType'};
    target = {label: 'Target',
                    name: 'targetId',
                    type: 'inputSelect',
                    required: true,
                    items : undefined,
                    itemDisplay : 'description',
                    updatable: true,
                    subOf: 'target'};
    value = {label: 'Value',
                    name: 'value',
                    type: 'inputNumber',
                    required: false,
                    updatable: true};
                    
    private setTypeItems = async () => await GET("taskType").then(result =>{this.type.items = result;});
    private setTargetItems = () => GET("target").then(result =>{this.target.items = result;});
  }

