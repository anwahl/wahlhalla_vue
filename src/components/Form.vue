<template>
    <form @submit.prevent="validateForm" class="submit-form">
    <span class="form-title">{{ action }} {{ objectName }}</span>
    <div class="errors form-errors" v-if="errors.length > 0"><span v-for="error in errors">{{ error.message }}</span></div>
      <span  v-for="(prop, index) in objectProps">
        <div  v-if="(object.id != null && prop.updatable) || object.id == null" class="form-group">
            <label :class="prop.required ? 'required-field' : ''" :for="prop.name">{{ prop.label }}</label>
            <Input :prop="prop" :object="object" @onCreate="onCreate(prop.subOf, objectName)" :objectName="objectName"></Input>
        </div>
      </span>
    <button class="btn btn-primary"  type="submit" >{{ action }}</button>
    <button class="btn btn-secondary"  type="reset" @click="errors = [];" >Clear</button>
  </form>
</template>
<script>
import Input from "@/components/Input.vue";
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue3-timepicker/dist/VueTimepicker.css';
import GET from "@/composables/GET";
import { watch, ref } from 'vue';

export default {
    name: "edit-form",
    components: {
        Input
    },
    emits: ['doOnSubmit'],
    props: {
        action: String,
        objectName: String | Function,
        objectProps: {
            type: [Array, Object],
            default: []
        },
        object: {
        },
        errors: {
            type: [Array, Object],
            default: []
        }
    },
    data() {
        return {
            errorsToDisplay: {
                type: Array,
                default: []
            }
        }
    },
    methods: {
        validateForm(e) {
            this.objectProps.forEach((prop) => {
            if (prop.required && !this.object[prop.name]){
                this.errorsToDisplay.push({message: prop.label + " is required.", property: prop.name})
            }
            });
            if (this.errorsToDisplay.length > 0) {
                return false;
            } else {
                this.$emit('doOnSubmit');
                return true;
            }
            e.preventDefault();
        },
        async onCreate(prop, objectName) {
            let newOptions = await GET(`${prop}`);
            let options = "<option value='null'></option>";
            newOptions.forEach((option) => {
                options = options + "<option value='" + option.id +"'>" + (option.description ? option.description : (option.firstName ? option.firstName + ' ' + option.lastName : option)) + "</option>";
            });
            document.getElementById(objectName + prop).innerHTML = options;
        }
    }
}

</script>