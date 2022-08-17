<template>
  <Form :object="object" action="Create" @doOnSubmit="saveObject" :objectProps="objectProps" :objectName="objectName"></Form>
</template>
<script>
import Form from "@/components/Form.vue";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";

export default  {
  name: "object-create",
  emits: ['onFormSubmit'],
  components: { Form },
  data() {
    let object = { id: null };
    this.objectProps.forEach((element) => {
        if (element.value != null) {
          object[element.name] = element.value;
        } else {
          object[element.name] = null
        }
    });
    return {
        object,
        errors: {
            type: Array,
            default: []
        },
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

          let accessToken = await auth0.getTokenSilently();
          let result = await POST(this.objectURL, accessToken, data);
          this.object.id = result.id;
          this.objectProps.forEach((element) => {
              this.object[element.name] = null;
          });
          this.$emit('onFormSubmit');
    }
  },
  mounted () {
       
  }
}
</script>