<template>
<form @submit.prevent="validateForm" class="submit-form">
    <span class="form-title">{{ action }} Assigned Task</span>
    <vue-final-modal :lock-scroll="false" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showCreate = false" />
        <component :is="typeCreate"  @onFormSubmit="showCreate = false; onCreate(typeToCreate)" ></component>
    </vue-final-modal>
    <div class="errors" v-if="errors"><span v-for="error in errors">{{ error.message }}</span></div>
        <div v-for="(prop, index) in objectProps" class="form-group">
        <hr v-if="prop.name == 'targetTypeId'" />
        <span class="info" v-if="prop.name == 'targetTypeId'" >Task Filter Options</span>
            <label :class="prop.required ? 'required-field' : ''" for="{{ prop.name }}">{{ prop.label }}</label>
            <Input :prop="prop" :object="object" v-if="prop.subOf == 'taskType'" @onOptionChange="taskTypeChange"></Input>
            <Input :prop="prop" :object="object" v-else-if="prop.subOf == 'targetType'" @onOptionChange="targetTypeChange"></Input>
            <Input :prop="prop" :object="object" v-else-if="prop.subOf == 'target'" @onOptionChange="targetChange"></Input>
            <Input :prop="prop" :object="object" v-else></Input>
            <button class="btn btn-secondary btn-inline" v-if="prop.subOf" type="button" @click="create(prop.subOf)">Create</button>
        <hr v-if="prop.name == 'taskTypeId'" />
        <span class="info" v-if="prop.name == 'taskTypeId'" >Assigned Task Options</span>
        </div>
    <button class="btn btn-primary" type="submit">{{ action }}</button>
</form>
</template>
<script setup>
    let personOptions = await GET("person");
    let taskTypeOptions = await GET("taskType");
    let targetTypeOptions = await GET("targetType");
    let targetOptions = await GET("target");
    let taskOptions = await GET("task");

    const props = defineProps({
        action: String,
        onDate: String,
        currentAssignedTask: {
            type: Array,
            default: []
        }
    });
    
    const createObjectProps = 
                        [{label: 'Target Type',
                            name: 'targetTypeId',
                            type: 'inputSelect',
                            subOf: 'targetType',
                            subOfSub: 'target',
                            items : targetTypeOptions,
                            itemDisplay : 'description'},
                        {label: 'Target',
                            name: 'targetId',
                            type: 'inputSelect',
                            subOf: 'target',
                            items : targetOptions,
                            itemDisplay : 'description'},
                        {label: 'Task Type',
                            name: 'taskTypeId',
                            type: 'inputSelect',
                            subOf: 'taskType',
                            subOfSub: 'task',
                            items : taskTypeOptions,
                            itemDisplay : 'description'},
                        {label: 'Task',
                            name: 'taskId',
                            type: 'inputSelect',
                            subOf: 'task',
                            items : taskOptions,
                            itemDisplay : 'description',
                            required: true},
                        {label: 'Assigned Person',
                            name: 'personId',
                            type: 'inputSelect',
                            items : personOptions,
                            itemDisplay : 'firstName',
                            subOf: 'person'},
                        {label: 'Schedule Type',
                            name: 'type',
                            type: 'inputSelect',
                            items : [{name: 'DAILY'},{name: 'WEEKLY'},{name: 'MONTHLY'},{name: 'YEARLY'},{name: 'STANDALONE'}],
                            itemDisplay : 'name',
                            required: true},
                        {label: 'Due Date',
                            name: 'dueDate',
                            type: 'inputDate',
                            required: true,
                            value: props.onDate},
                        {label: 'Start Time',
                            name: 'timeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'End Time',
                            name: 'endTimeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'Occurrences',
                            name: 'occurrences',
                            type: 'inputNumber',
                            required: false},
                        {label: 'Complete',
                            name: 'complete',
                            type: 'inputCheck'}],
            updateObjectProps = [{label: 'Assigned Person',
                            name: 'personId',
                            type: 'inputSelect',
                            items : {
                                type: Array,
                                default: []
                            },
                            itemDisplay : 'firstName',
                            subOf: 'person'},
                        {label: 'Task',
                            name: 'taskId',
                            type: 'inputSelect',
                            subOf: 'task',
                            items : {
                                type: Array,
                                default: []
                            },
                            itemDisplay : 'description',
                            required: true},
                        {label: 'Due Date',
                            name: 'dueDate',
                            type: 'inputDate',
                            required: true},
                        {label: 'Start Time',
                            name: 'timeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'End Time',
                            name: 'endTimeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'Complete',
                            name: 'complete',
                            type: 'inputCheck'}],
            updateSeriesObjectProp =
                        [{label: 'Person',
                            name: 'personId',
                            type: 'inputSelect',
                            items : {
                                type: Array,
                                default: []
                            },
                            itemDisplay : 'firstName',
                            subOf: 'person'},
                        {label: 'Task',
                            name: 'taskId',
                            type: 'inputSelect',
                            subOf: 'task',
                            items :  {
                                type: Array,
                                default: []
                            },
                            itemDisplay : 'description',
                            required: true},
                        {label: 'Start Time',
                            name: 'timeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'End Time',
                            name: 'endTimeOfDay',
                            type: 'inputTime',
                            required: false},
                        {label: 'Complete',
                            name: 'complete',
                            type: 'inputCheck'}];

    
</script>
<script>
import TargetCreate from "@/views/Target/TargetCreate.vue";
import TargetTypeCreate from "@/views/TargetType/TargetTypeCreate.vue";
import PersonCreate from "@/views/Person/PersonCreate.vue";
import TaskTypeCreate from "@/views/TaskType/TaskTypeCreate.vue";
import TaskCreate from "@/views/Task/TaskCreate.vue";
import Input from "@/components/Input.vue";
import POST from "@/composables/POST";
import GET from "@/composables/GET";
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import dateFunc from 'date-and-time';
import { VueFinalModal } from 'vue-final-modal';

export default  {
  name: "workflow",
  emits: ['onFormSubmit'],
  components: { Input, TargetCreate, TargetTypeCreate, PersonCreate, TaskTypeCreate, TaskCreate, VueFinalModal },
  watch: {
    onDate:{handler (newDate) {
            this.object["dueDate"] = newDate;
        }
    }
  },
  data() {
    let object = [{id: null}];
    var objectProps = [{}];
    if (this.action == "Create") {
        objectProps = this.createObjectProps;
    } else if (this.action == "Update") {
        objectProps = this.updateObjectProps;
    } else if (this.action == "Update Series") {
        objectProps = this.updateSeriesObjectProps;
    } else {
    }
    return {
        render: true,
        showCreate: false,
        typeCreate: String,
        typeToCreate: String,
        errors: {
            type: Array,
            default: []
        },
        isLoading: true,
        object,
        objectProps
    }
  },
  methods: {
    create(prop) {
        this.typeCreate = prop[0].toUpperCase() + prop.slice(1) + 'Create';//Super Hacky. Do this better sometime.
        this.typeToCreate = prop;
        this.showCreate = true;
    },
    async onCreate(prop) {
        let newOptions = await GET(`${prop}/`);
        let options = "<option value='null'></option>";
        newOptions.forEach((option) => {
            options = options + "<option value='" + option.id +"'>" + (option.description ? option.description : (option.firstName ? option.firstName + ' ' + option.lastName : option)) + "</option>";
        });
        document.getElementById(prop + "Id").innerHTML = options;
    },
    async getPersons() {
        this.personItems = await GET("person");
        return this.personItems;
    },
    async getTasks() {
        this.taskItems = await GET("task");
        return this.taskItems;
    },
    async getTaskTypes() {
        this.taskTypeItems = await GET("taskType");
        return this.typeItems;
    },
    async getTargets() {
        this.targetItems = await GET("target");
        return this.targetItems;
    },
    async getTargetTypes() {
        this.targetTypeItems = await GET("targetType");
        return this.typeItems;
    },
    async saveObject() {
        let data = { };
        this.objectProps.forEach((element) => {
            if (element.type == "inputTime" && this.object[element.name] != null && this.object[element.name] != undefined) {
                let hours, minutes;
                if (this.object[element.name].hours < 10 && this.object[element.name].hours[0] != '0') {
                    hours = '0' +  this.object[element.name].hours;
                }else {
                     hours = this.object[element.name].hours;
                }
                if (this.object[element.name].minutes < 10  && this.object[element.name].minutes[0] != '0' ) {
                    minutes = '0' +  this.object[element.name].minutes;
                } else {
                    minutes = this.object[element.name].minutes;
                }
                data[element.name] = `${hours}:${minutes}`;
            } else if (element.type == "inputCheck" && this.object[element.name] == null){
                data[element.name] = false;
            } else {
                data[element.name] = this.object[element.name];
            }
        });

        let result = await POST('assignedTask', data);
        this.object.id = result.id;
        this.objectProps.forEach((element) => {
            this.object[element.name] = null;
        });
        this.$emit('onFormSubmit');
    },
    validateForm(e) {
        this.errors = [];
        this.objectProps.forEach((prop) => {
            if (prop.required && !this.object[prop.name]) {
                this.errors.push({message: prop.label + " is required.", property: prop.name})
            }
        });
        if (this.errors.length > 0) {
            return false;
        } else {
            this.saveObject()
            return true;
        }
        e.preventDefault();
    },
    refreshLists() {
        
    },
    async taskTypeChange() {
        if (this.object.targetId == null) {
            let taskOptions = await GET("task/type/" + this.object.taskTypeId);
            let options = "<option></option>";
            taskOptions.forEach((option) => {
                options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
            });
            document.getElementById("taskId").innerHTML = options;
        } else {
            this.targetOrTypeChange();
        }
    },
    async targetChange() {
        if (this.object.taskTypeId == null) {
            let taskOptions = await GET("task/target/" + this.object.targetId);
            let options = "<option></option>";
            taskOptions.forEach((option) => {
                options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
            });
            document.getElementById("taskId").innerHTML = options;
        } else {
            this.targetOrTypeChange();
        }
    },
    async targetTypeChange() {
        let targetOptions = await GET("target/type/" + this.object.targetTypeId);
        let options = "<option></option>";
        targetOptions.forEach((option) => {
            options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
        });
        document.getElementById("targetId").innerHTML = options;
    },
    async targetOrTypeChange() {
        let taskOptions = await GET(`task/targetAndType/${this.object.targetId}/${this.object.taskTypeId}`);
        let options = "<option></option>";
        taskOptions.forEach((option) => {
            options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
        });
        document.getElementById("taskId").innerHTML = options;
    },
    async forceRerender() {
      this.render = false;
      this.isLoading = true;
      await this.$nextTick();
      this.render = true;
      this.isLoading = false;
    }
  }
}
</script>