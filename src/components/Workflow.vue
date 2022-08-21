<template>
<form @submit.prevent="validateForm" :key="componentKey" v-if="render" class="submit-form">
    <span class="form-title">{{ action }} Assigned Task</span>
    <div class="errors" v-if="errors"><span v-for="error in errors">{{ error.message }}</span></div>
        <div v-for="(prop, index) in objectProps" class="form-group">
        <hr v-if="prop.name == 'targetTypeId'" />
        <span class="info" v-if="prop.name == 'targetTypeId'" >Task Filter Options</span>
            <label :class="prop.required ? 'required-field' : ''" for="{{ prop.name }}">{{ prop.label }}</label>
            <Input :prop="prop" :object="object" v-if="prop.subOf == 'taskType'" @onOptionChange="taskTypeChange" @onCreate="onCreate(prop.subOf)" objectName="assignedTask"></Input>
            <Input :prop="prop" :object="object" v-else-if="prop.subOf == 'targetType'" @onOptionChange="targetTypeChange" @onCreate="onCreate(prop.subOf)" objectName="assignedTask"></Input>
            <Input :prop="prop" :object="object" v-else-if="prop.subOf == 'target'" @onOptionChange="targetChange" @onCreate="onCreate(prop.subOf)" objectName="assignedTask"></Input>
            <Input :prop="prop" :object="object" v-else objectName="assignedTask"></Input>
        <hr v-if="prop.name == 'taskTypeId'" />
        <span class="info" v-if="prop.name == 'taskTypeId'" >Assigned Task Options</span>
        </div>
    <button class="btn btn-primary" type="submit">{{ action }}</button>
    <button class="btn btn-secondary"  type="reset" @click="errors = [];" >Clear</button>
</form>
</template>
<script setup>
import { watch, ref, onBeforeMount, onBeforeUpdate } from 'vue';
    const props = defineProps({
        action: String, 
        onDate: String,
        currentAssignedTask: {
            type: Array,
            default: []
        }
    });
    const emit = defineEmits(['onFormSubmit'])
    let errors = [];
    const object = [{id: props.currentAssignedTask || null}];
    const componentKey = ref(0);
    watch(() => props['onDate'], (newDate, oldDate) => {
        object["dueDate"] = newDate;
    });
    let oProps = [];
    oProps.push({label: 'Target Type',
                            name: 'targetTypeId',
                            type: 'inputSelect',
                            subOf: 'targetType',
                            subOfSub: 'target',
                            items : await GET("targetType"),
                            itemDisplay : 'description'});
    oProps.push({label: 'Target',
                            name: 'targetId',
                            type: 'inputSelect',
                            subOf: 'target',
                            items : await GET("target"),
                            itemDisplay : 'description'})
    oProps.push({label: 'Task Type',
                            name: 'taskTypeId',
                            type: 'inputSelect',
                            subOf: 'taskType',
                            subOfSub: 'task',
                            items : await GET("taskType"),
                            itemDisplay : 'description'});
    const objectProps = oProps.concat(await getProperties(AssignedTask));
    onBeforeMount(() => {
        objectProps.forEach((element) => {
            if (!object[element.name]) {
                object[element.name] = element.value || null;
            }
        });
    });
    onBeforeUpdate(() => {
        componentKey.value++;
    });
    
    async function saveObject() {
        let data = { };
        objectProps.forEach((element) => {
            if (element.type == "inputTime" && object[element.name] != null && object[element.name] != undefined) {
                let hours, minutes;
                if (object[element.name].hours < 10 && object[element.name].hours[0] != '0') {
                    hours = '0' +  object[element.name].hours;
                }else {
                     hours = object[element.name].hours;
                }
                if (object[element.name].minutes < 10  && object[element.name].minutes[0] != '0' ) {
                    minutes = '0' +  object[element.name].minutes;
                } else {
                    minutes = object[element.name].minutes;
                }
                data[element.name] = `${hours}:${minutes}`;
            } else if (element.type == "inputCheck" && object[element.name] == null){
                data[element.name] = false;
            } else {
                data[element.name] = object[element.name];
            }
        });

        let result = await POST('assignedTask', data);
       if (result.id) {
            object.id = result.id;
            objectProps.forEach((element) => {
                object[element.name] = null;
            });
            emit('onFormSubmit');
        } else {
            errors.push({message: `An Error has occurred. Does the ${objectName} already exist?`, property: object});
        }
    }
    
    function validateForm(e) {
        errors = [];
        objectProps.forEach((prop) => {
            if (prop.required && !object[prop.name]) {
                errors.push({message: prop.label + " is required.", property: prop.name})
            }
        });
        if (errors.length > 0) {
            return false;
        } else {
            saveObject()
            return true;
        }
        e.preventDefault();
    }
</script>
<script>
import Input from "@/components/Input.vue";
import Form from "@/components/Form.vue";
import POST from "@/composables/POST";
import GET from "@/composables/GET";
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import dateFunc from 'date-and-time';
import getProperties from "@/composables/getProperties.js";
import AssignedTask from "@/types/impl/AssignedTask";


export default  {
  name: "workflow",
  emits: ['onFormSubmit'],
  components: { Input, Form },
  data() {
    return {
        render: true,
        typeCreate: String,
        isLoading: true
    }
  },
  methods: {
    async onCreate(prop) {
        let newOptions = await GET(`${prop}`);
        let options = "<option value='null'></option>";
        newOptions.forEach((option) => {
            options = options + "<option value='" + option.id +"'>" + (option.description ? option.description : (option.firstName ? option.firstName + ' ' + option.lastName : option)) + "</option>";
        });
        document.getElementById('assignedTask' + prop).innerHTML = options;
    },
    
    async taskTypeChange() {
        if (this.object.targetId == null) {
            let taskOptions = await GET("task/type/" + this.object.taskTypeId);
            let options = "<option></option>";
            taskOptions.forEach((option) => {
                options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
            });
            document.getElementById("assignedTasktask").innerHTML = options;
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
            document.getElementById("assignedTasktask").innerHTML = options;
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
        document.getElementById("assignedTasktarget").innerHTML = options;
    },
    async targetOrTypeChange() {
        let taskOptions = await GET(`task/targetAndType/${this.object.targetId}/${this.object.taskTypeId}`);
        let options = "<option></option>";
        taskOptions.forEach((option) => {
            options = options + "<option value='" + option.id +"'>" + option.description + "</option>";
        });
        document.getElementById("assignedTasktask").innerHTML = options;
    },
    async forceRerender() {
      this.render = false;
      this.isLoading = true;
      await this.$nextTick();
      this.render = true;
      this.isLoading = false;
    }
  },
  async mounted() { 
    await this.forceRerender(); 
  } 
}
</script>