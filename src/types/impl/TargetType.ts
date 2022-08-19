import type TargetTypeInterface from "../TargetType.interface";

export default class TargetType implements TargetTypeInterface{
    description = {label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true,
                updatable: true};
  }

