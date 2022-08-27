<template>
  <Form 
      :object="object"
      action="Create"
      @doOnSubmit="saveObject"
      :objectProps="objectProps"
      :objectName="objectName.valueOf()"
      :errors="errors"></Form>
</template>
<script>
import Form from "@/components/Form.vue";
import POST from "@/composables/POST";

export default  {
  name: "object-create",
  emits: ['onFormSubmit'],
  components: { Form },
  data() {
    let object = { id: null };
    this.objectProps.forEach((element) => {
          if (element.name == this.byObject) {
            object[element.name] = this.byObjectId;
           } else { 
            object[element.name] = element.value || null;
           }
    });
    return {
        object,
        errors: {
            type: Array,
            default: []
        }
    }
  },
  props: {
    objectURL: String | Function,
    objectProps: {
        type: Array,
        default: []
    },
    objectName: String | Function,
    byObjectId: [String, Number],
    byObject: String
  },
  methods: {
      async saveObject() {
          let data = { };
          this.errors = new Array;
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
          let result = await POST(this.objectURL, data);
          if (result.id) {
              this.object.id = result.id;
              this.objectProps.forEach((element) => {
                  this.object[element.name] = element.value || null;
              });
              this.$emit('onFormSubmit');
          } else {
              this.errors.push({message: `Error: ${result.message}`, property: this.object});
          }
    }
  }
}
</script>