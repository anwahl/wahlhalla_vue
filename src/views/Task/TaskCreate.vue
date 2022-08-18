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
      this.typeItems = await GET("taskType");
      return this.typeItems;
    },
    async getTargets() {
      this.targetItems = await GET("target");
      return this.targetItems;
    }
  },
  mounted() {
    this.typeItems = this.getTypes();
    this.targetItems = this.getTargets();
  }
};
</script>