
import type PersonInterface from "../Person.interface";

export default class Person implements PersonInterface {
    
    firstName = {label: 'First Name',
                name: 'firstName',
                type: 'inputText',
                required: true,
                updatable: true};
    lastName = {label: 'Last Name',
                name: 'lastName',
                type: 'inputText',
                required: true,
                updatable: true};
    email = {label: 'E-Mail',
                name: 'email',
                type: 'inputText',
                required: false,
                updatable: true};
}

