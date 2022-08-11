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
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{ item[prop.itemDisplay] }}</option>
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
      </div>
      <button @click="saveObject(); $emit('onFormSubmit')" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";

export default  {
  name: "object-create",
  emits: ['onFormSubmit'],
  data() {
    let object = { id: null };
    this.objectProps.forEach((element) => {
        object[element.name] = null
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
        this.objectProps.forEach((element) => {
            data[element.name] = this.object[element.name];
        });

        let accessToken = await auth0.getTokenSilently();
        let result = await POST(this.objectURL, accessToken, data);
        // @ts-ignore
        this.object.id = result.id;

        this.objectProps.forEach((element) => {
            this.object[element.name] = null;
        });
    }
  }
}
</script>