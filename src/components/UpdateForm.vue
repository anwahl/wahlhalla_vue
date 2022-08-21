<template>
  <Form v-if="currentObject" :object="currentObject" action="Update" @doOnSubmit="updateObject" :objectProps="objectProps" :objectName="objectName" :errors="errors"></Form>
  <button class="btn btn-secondary delete-btn" @click="deleteObject();">Delete</button>
  <Confirmation ref="confirmDialogue"></Confirmation>
</template>
<script>
import Form from "@/components/Form.vue";
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import GET from "@/composables/GET";
import dateFunc from 'date-and-time';
import Confirmation from '../components/Confirmation.vue'
import { watch, ref } from 'vue';

export default {
  name: "object-update",
  emits: ['onFormSubmit'],
  components: { Confirmation, Form },
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
    let currentObject = [{ id: null }];
    this.objectProps.forEach((element) => {
      currentObject[element.name] = null
    });
    return {
        currentObject,
        errors: {
            type: Array,
            default: []
        }
    }
  },
  methods: {
    async getObject(id) {
      this.errors = new Array;
      this.currentObject = await GET(`${this.objectURL}/${id}`);
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
    async updateObject() {
      this.errors = new Array;
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
      
      let result = await PUT(`${this.objectURL}` + (this.inSeries ? '/series' : '') + `/${this.currentObject.id}`, this.currentObject);
      if (result.success) {
        this.$emit('onFormSubmit');
      } else {
        this.errors.push({message: `Error: ${result.message}`, property: this.object});
      }
    },
    async deleteObject() {
      this.errors = new Array;
      const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Task(s)',
                message: `Are you sure you want to delete the ${this.objectName}(s)? It cannot be undone.`,
                okButton: 'Delete Forever',
            });
      if (ok) {
          let result = await DELETE(`${this.objectURL}` + (this.inSeries ? '/series' : '') + `/${this.currentObject.id}`);
          if (result.success) {
            this.$emit('onFormSubmit');
          } else {
            this.errors.push({message: `Error: ${result.message}`, property: this.object});
          }
      }
    }
  },
  mounted() {
    this.getObject(this.objectId);
    watch(() => this.objectId, async (newId, oldId) => {
        this.getObject(newId);
    });
  }
};
</script>