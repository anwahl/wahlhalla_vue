<template>
    <form class="submit-form">
    <span class="form-title">{{ action }} {{ objectName }}</span>
    <div class="errors" v-if="errors.length > 0"><span v-for="error in errors">{{ error.message }}</span></div>
      <div v-for="(prop, index) in objectProps" class="form-group">
        <label :class="prop.required ? 'required-field' : ''" for="{{ prop.name }}">{{ prop.label }}</label>
        <Input :prop="prop" :object="object" ></Input>
      </div>
    <button type="submit" class="btn btn-primary"  @click="validateForm">{{ action }}</button>
  </form>
</template>
<script>
import Input from "@/components/Input.vue";
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue3-timepicker/dist/VueTimepicker.css';

export default {
    name: "editForm",
    components: {
        Input
    },
    emits: ['onSubmit'],
    props: {
        action: String,
        objectName: String,
        objectProps: {
            type: Array,
            default: []
        },
        object: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            errors: {
                type: Array,
                default: []
            }
        }
    },
    methods: {
        validateForm() {
            this.errors = [];
            this.objectProps.forEach((prop) => {
            if (prop.required && !this.object[prop.name]){
                this.errors.push({message: prop.label + " is required.", property: prop.name})
            }
            });
            if (this.errors.length > 0) {
                return false;
            } else {
                this.$emits('onSubmit');
                return true;
            }
        }
    }
}

</script>