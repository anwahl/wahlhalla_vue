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
          v-model="this.currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputText'"
        />
        <select @search="$emit('fetchOptions')"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="this.currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputSelect'">
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{ prop.itemSubOf ? item[prop.itemSubOf][prop.itemDisplay] : item[prop.itemDisplay] }}</option>
        </select>
        <input
          type="number"
          class="form-control"
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="this.currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputNumber'"
         />
        <Datepicker :enableTimePicker="false" autoApply
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="this.currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputDate'"
        />
        <Datepicker timePicker autoApply
          id="{{ prop.name }}"
          :required="prop.required ? true : false"
          v-model="this.currentObject[prop.name]"
          name="{{ prop.name }}"
          v-if="prop.type == 'inputTime'"
           />
        <label class="checkboxContainer" v-if="prop.type == 'inputCheck'">
          <input
              type="checkbox"
              id="{{ prop.name }}"
              :required="prop.required ? true : false"
              v-model="this.currentObject[prop.name]"
              name="{{ prop.name }}"
            />
            <span class="checkbox" ></span>
          </label>
      </div>
    </form>
    <button type="submit" class="btn btn-primary"
      @click="updateObject(this.currentObject.id); $emit('onFormSubmit')">
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
import 'vue3-timepicker/dist/VueTimepicker.css'

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
    objectName: String
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
    },
    async updateObject(id) {
      this.objectProps.forEach((element) => {
        if (element.type == "inputTime" && this.currentObject[element.name] != null && this.currentObject[element.name] != undefined) {
          this.currentObject[element.name] = `${this.currentObject[element.name].HH}:${this.currentObject[element.name].mm}`;
        } else if (element.type == "inputCheck" && this.currentObject[element.name] == null){
            this.currentObject[element.name] = false;
        } else {
          this.currentObject[element.name] = this.currentObject[element.name];
        }
      });

      var accessToken = await auth0.getTokenSilently();
      await PUT(`${this.objectURL}/${this.currentObject.id}`, accessToken, this.currentObject);
    },
    async deleteObject() {
      var accessToken = await auth0.getTokenSilently();
      await DELETE(`${this.objectURL}/${this.currentObject.id}`, accessToken);
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