<template>
  <CreateForm
    objectURL="task"
     :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true},
                {label: 'Type',
                name: 'typeId',
                type: 'inputSelect',
                required: true,
                items : this.typeItems,
                itemDisplay : 'description'},
                {label: 'Target',
                name: 'targetId',
                type: 'inputSelect',
                required: true,
                items : this.targetItems,
                itemDisplay : 'description'},
                {label: 'Value',
                name: 'value',
                type: 'inputNumber',
                required: false}]"
    objectName="Task"
  />
</template>
<script>
import CreateForm from "@/components/CreateForm.vue";
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";

export default {
  name: "task-create",
  components: { CreateForm },
  data () {
    return {
      typeItems: {
          type: Array
      },
      targetItems: {
          type: Array
      }
    }
  },
  methods: {
    async getTypes() {
      var accessToken = await auth0.getTokenSilently();
      this.typeItems = await GET("taskType", accessToken);
      return this.typeItems;
    },
    async getTargets() {
      var accessToken = await auth0.getTokenSilently();
      this.targetItems = await GET("target", accessToken);
      return this.targetItems;
    }
  },
  mounted() {
    this.typeItems = this.getTypes();
    this.targetItems = this.getTargets();
  }
};
</script>