import type TargetInterface from "../Target.interface";
import GET from "@/composables/GET";

export default class Target implements TargetInterface{
    constructor () {
        this.setTypeItems();
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
                    subOf: 'targetType'};
                    
    private setTypeItems = async () => await GET("targetType").then(result =>{this.type.items = result;});
}

