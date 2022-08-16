<template>
  <Form :object="object" action="Create" @doOnSubmit="saveObject" :objectProps="objectProps" :objectName="objectName"></Form>
</template>
<script lang="ts">
import Form from "@/components/Form.vue";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";

export default  {
  name: "object-create",
  emits: ['onFormSubmit'],
  components: { Form },
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
          // @ts-ignore
          this.objectProps.forEach((element) => {
              // @ts-ignore
              if (element.type == "inputTime" && this.object[element.name] != null && this.object[element.name] != undefined) {
                // @ts-ignore
                let hours, minutes;
                // @ts-ignore
                if (this.object[element.name].hours < 10 && this.object[element.name].hours[0] != '0') {
                  // @ts-ignore
                  hours = '0' +  this.object[element.name].hours;
                }else {
                  // @ts-ignore
                  hours = this.object[element.name].hours;
                }
                // @ts-ignore
                if (this.object[element.name].minutes < 10  && this.object[element.name].minutes[0] != '0' ) {
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
          // @ts-ignore
          this.$emit('onFormSubmit');
    }
  },
  mounted () {
       
  }
}
</script>