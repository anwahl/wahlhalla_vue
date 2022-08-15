<template>
  <div v-if="currentObject" class="submit-form">
    <form>
      <span class="form-title">Edit {{ objectName }}</span>
      <div v-for="(prop, index) in objectProps" class="form-group">
        <label for="{{ prop.name }}">{{ prop.label }}</label>
        <input
          type="text"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputText'"
        />
        <select @search="$emit('fetchOptions')"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputSelect'">
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{ prop.itemSubOf ? item[prop.itemSubOf][prop.itemDisplay] : item[prop.itemDisplay] }}</option>
        </select>
        <input
          type="number"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputNumber'"
         />
        <Datepicker :enableTimePicker="false" autoApply 
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputDate'"
        />
        <Datepicker timePicker
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="currentObject[prop.name]"
          :value="currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputTime'"
           />
        <label class="checkboxContainer" v-if="prop.type == 'inputCheck'">
          <input
              type="checkbox"
              id="{{ prop.name }}"
              :required="prop.required ? true : false"
              v-model="currentObject[prop.name]"
              name="{{ prop.name }}"
            />
            <span class="checkbox" ></span>
          </label>
      </div>
    </form>
    <button type="submit" class="btn btn-primary"
      @click="updateObject(currentObject.id); $emit('onFormSubmit')">
      Update
    </button>
    <button class="btn btn-secondary"
      @click="deleteObject(); $emit('onFormSubmit')">
      Delete
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a {{ objectName }}...</p>
  </div>
</template>
<script>
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import GET from "@/composables/GET";
import auth0 from "@/composables/auth0Client";
import Datepicker from '@vuepic/vue-datepicker';
import VueTimepicker from 'vue3-timepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue3-timepicker/dist/VueTimepicker.css';
import dateFunc from 'date-and-time';

import { watch } from 'vue';
export default {
  name: "object-update",
  emits: 'onFormSubmit',
  components: { Datepicker, VueTimepicker },
  props:{
    objectId: Number,
    objectURL: String,
    objectProps: {
      type: Array,
      default: []
    },
    objectName: String,
    inSeries: false
  },
  data() {
    let currentObject = { id: null };
    this.objectProps.forEach((element) => {
      currentObject[element.name] = null
    });
    return {
        currentObject: null,
        message: ''
    }
  },
  methods: {
    async getObject(id) {
      var accessToken = await auth0.getTokenSilently();
      this.currentObject = await GET(`${this.objectURL}/${id}`, accessToken);
      for (const element in this.currentObject) {
        if (new RegExp("^[0-9]{2}:[0-9]{2}:00$").test(this.currentObject[element])) {
          this.currentObject[element] = {hours: this.currentObject[element].split(':')[0], minutes: this.currentObject[element].split(':')[1]};
        }
        if (new RegExp("^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$").test(this.currentObject[element])) {
          let date = dateFunc.addHours(new Date(this.currentObject[element]), 6); //Timezone issues?
          date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? (date.getDate()) : ('0' + (date.getDate()))) + '/' + date.getFullYear();
          this.currentObject[element] = date;
        }
      };
    },
    async updateObject(id) {
      this.objectProps.forEach((element) => {
        if (element.type == "inputTime" && this.currentObject[element.name] != null && this.currentObject[element.name] != undefined) {
          let hours, minutes;
          if (this.currentObject[element.name].hours < 10 && this.currentObject[element.name].hours[0] != '0') {
            hours = '0' +  this.currentObject[element.name].hours;
          }else {
            hours = this.currentObject[element.name].hours;
          }
          if (this.currentObject[element.name].minutes < 10 && this.currentObject[element.name].minutes[0] != '0') {
            minutes = '0' +  this.currentObject[element.name].minutes;
          } else {
            minutes = this.currentObject[element.name].minutes;
          }
          this.currentObject[element.name] = `${hours}:${minutes}`;
        } else if (element.type == "inputCheck" && this.currentObject[element.name] == null){
            this.currentObject[element.name] = false;
        } else {
          this.currentObject[element.name] = this.currentObject[element.name];
        }
      });

      var accessToken = await auth0.getTokenSilently();
      await PUT(`${this.objectURL}` + (this.inSeries ? '/series' : '') + `/${this.currentObject.id}`, accessToken, this.currentObject);
    },
    async deleteObject() {
      var accessToken = await auth0.getTokenSilently();
      await DELETE(`${this.objectURL}` + (this.inSeries ? '/series' : '') + `/${this.currentObject.id}`, accessToken);
    }
  },
  mounted() {
    this.message = '';
    this.getObject(this.objectId);
    watch(() => this.objectId, async (newId, oldId) => {
        this.getObject(newId);
    });
  }
};
</script>