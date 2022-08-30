<template>
    <input
          type="text"
          class="form-control"
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          v-if="prop.type == 'inputText'"
        />
        <select 
          class="form-control"
          :id="objectName + (prop.subOf || prop.name) "
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          @change="$emit('onOptionChange')"
          :name="prop.name"
          v-if="prop.type == 'inputSelect'">
            <option></option>
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{prop.itemSubOfSub ? prop.itemSubOf ? prop.itemOtherDisplay ? item[prop.itemOtherDisplay] + ' - ' + item[prop.itemSubOf][prop.itemDisplay] + ' (' + item[prop.itemSubOf][prop.itemSubOfSub][prop.itemSubDisplay] + ')' : item[prop.itemSubOf][prop.itemDisplay] + ' (' + item[prop.itemSubOf][prop.itemSubOfSub][prop.itemSubDisplay] + ')'  : item[prop.itemDisplay] + ' (' + item[prop.itemSubOfSub][prop.itemSubDisplay] + ')'  : prop.itemSubOf ? item[prop.itemSubOf][prop.itemDisplay] : item[prop.itemDisplay] }}</option>
        </select>
        <button class="btn btn-secondary btn-inline" v-if="prop.type == 'inputSelect' && prop.subOf" type="button" @click="create(prop.subOf)">Create</button>
        <vue-final-modal v-if="prop.type == 'inputSelect' && prop.subOf" :lock-scroll="false" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
              <button class="modal__close" @click="showCreate = false" />
              <CreateForm   @onFormSubmit="showCreate = false; $emit('onCreate')" 
                              :objectProps="createObjectProps"
                              :objectURL="createObjectURL"
                              :objectName="createObjectName"
                              />
        </vue-final-modal>
        <input
          type="number"
          class="form-control"
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          v-if="prop.type == 'inputNumber'"
         />
        <Datepicker :enableTimePicker="false" autoApply :textInput="true" 
          :id="objectName+prop.name"
          :inputClassName="objectName+prop.name"
          :required="prop.required ? true : false"
          :name="objectName+prop.name"
          v-model="object[prop.name]"
          v-if="prop.type == 'inputDate'"
          @update:modelValue="$emit('onDateTimePicked')"
        />
        <Datepicker timePicker
          :id="objectName+prop.name"
          :inputClassName="objectName+prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="objectName+prop.name"
          v-if="prop.type == 'inputTime'"
          :is24="false"
          :startTime="{minutes: 0}"
          @update:modelValue="$emit('onDateTimePicked')"
        />
        <label class="checkboxContainer" v-if="prop.type == 'inputCheck'">
          <input
              type="checkbox" 
              :id="prop.name"
              :required="prop.required ? true : false"
              v-model="object[prop.name]"
              :name="prop.name"
            />
            <span class="checkbox" ></span>
          </label>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import getProperties from "@/composables/getProperties.js";
import AssignedTask from "@/types/impl/AssignedTask";
import Target from "@/types/impl/Target";
import TargetType from "@/types/impl/TargetType";
import Person from "@/types/impl/Person";
import TaskType from "@/types/impl/TaskType";
import Task from "@/types/impl/Task";
import { VueFinalModal } from 'vue-final-modal';
import { defineAsyncComponent } from 'vue'

export default {
    name: "form-input",
    emits: ['onOptionChange','onCreate','onDateTimePicked'],
    components: {
        Datepicker, VueFinalModal, CreateForm: defineAsyncComponent(() => import('@/components/CreateForm.vue'))
    },
    props: {
        prop: {},
        object: {},
        objectName: String
    },
    data () {
      return {
          createObjectProps: [],
          createObjectURL: '',
          createObjectName: '',
          typeCreated: '',
          showCreate: false,
      }
    },
    methods: {
      async create(prop) {
          if (prop === 'target') {
              this.createObjectProps = await getProperties(Target);
              this.createObjectName = "Target";
              this.createObjectURL = "target";
          } else if (prop == 'targetType') {
              this.createObjectProps = await getProperties(TargetType);
              this.createObjectName = "Target Type";
              this.createObjectURL = "targetType";
          } else if (prop == 'person') {
              this.createObjectProps = await getProperties(Person);
              this.createObjectName = "Person";
              this.createObjectURL = "person";
          } else if (prop == 'taskType') {
              this.createObjectProps = await getProperties(TaskType);
              this.createObjectName = "Task Type";
              this.createObjectURL = "taskType";
          } else if (prop == 'task') {
              this.createObjectProps = await getProperties(Task);
              this.createObjectName = "Task";
              this.createObjectURL = "task";
          } else if (prop == 'assignedTask') {
              this.createObjectProps = await getProperties(AssignedTask);
              this.createObjectName = "Assigned Task";
              this.createObjectURL = "assignedTask";
          }
          
          this.typeCreated = prop;
          this.showCreate = true;
      }
    }
}
</script>