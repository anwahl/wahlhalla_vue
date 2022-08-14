<template>
  <div class="submit-form">
  <span class="form-title">Add a {{ objectName }}</span>
    <div>
      <div v-for="(prop, index) in objectProps" class="form-group">
        <label for="{{ prop.name }}">{{ prop.label }}</label>
        <input
          type="text"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputText'"
        />
        <select
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputSelect'">
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{ prop.itemSubOf ? item[prop.itemSubOf][prop.itemDisplay] : item[prop.itemDisplay] }}</option>
        </select>
        <input
          type="number"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputNumber'"
        />
        <Datepicker :enableTimePicker="false" autoApply 
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputDate'"
          :value="prop.value" />
        
          <Datepicker timePicker
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputTime'"
           />
        
        <label class="checkboxContainer" v-if="prop.type == 'inputCheck'">
          <input
              type="checkbox"
              id="{{ prop.name }}"
              :required="prop.required ? true : false"
              v-model="object[prop.name]"
              name="{{ prop.name }}"
            />
            <span class="checkbox" ></span>
          </label>
      </div>
      <button @click="saveObject(); $emit('onFormSubmit')" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import {  Vue } from "vue-property-decorator";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default  {
  name: "object-create",
  emits: ['onFormSubmit'],
  components: { Datepicker },
  data() {
    let object = { id: null };
    // @ts-ignore
    this.objectProps.forEach((element) => {
        // @ts-ignore
        if (element.value != null) {
          // @ts-ignore
          object[element.name] = element.value;
        } else {
          // @ts-ignore
          object[element.name] = null
        }
    });
    return {
        object
    }
  },
  props: {
    objectURL: String,
    objectProps: {
        type: Array,
        default: []
    },
    objectName: String
  },
  methods: {
      async saveObject() {
        let data = { };
        // @ts-ignore
        this.objectProps.forEach((element) => {
            // @ts-ignore
            if (element.type == "inputTime" && this.object[element.name] != null && this.object[element.name] != undefined) {
              // @ts-ignore
              let hours, minutes;
              // @ts-ignore
              if (this.object[element.name].hours < 10) {
                // @ts-ignore
                hours = '0' +  this.object[element.name].hours;
              }else {
                // @ts-ignore
                hours = this.object[element.name].hours;
              }
              // @ts-ignore
              if (this.object[element.name].minutes < 10) {
                // @ts-ignore
                minutes = '0' +  this.object[element.name].minutes;
              } else {
                // @ts-ignore
                minutes = this.object[element.name].minutes;
              }
              // @ts-ignore
              data[element.name] = `${hours}:${minutes}`;
              // @ts-ignore
            } else if (element.type == "inputCheck" && this.object[element.name] == null){
              // @ts-ignore
               data[element.name] = false;
            } else {
              // @ts-ignore
              data[element.name] = this.object[element.name];
            }
        });

        let accessToken = await auth0.getTokenSilently();
        // @ts-ignore
        let result = await POST(this.objectURL, accessToken, data);
        // @ts-ignore
        this.object.id = result.id;
        // @ts-ignore
        this.objectProps.forEach((element) => {
            // @ts-ignore
            this.object[element.name] = null;
        });
    }
  },
  mounted () {
       
  }
}
</script>