export default interface Property {
    label: String;
    name: String;
    type: String;
    required: Boolean;
    updatable: boolean;
    items?: Array<{}>;
    itemDisplay?: String;
    itemSubOf?: String
    value?: String | Number | null;
    subOf?: String;
    subOfSub?: String;
}
