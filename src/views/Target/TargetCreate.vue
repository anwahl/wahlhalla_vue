<template>
  <CreateForm
    objectURL="target"
     :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true},
                {label: 'Type',
                name: 'typeId',
                type: 'inputSelect',
                required: true,
                items : this.typeItems,
                itemDisplay : 'description'}]"
    objectName="Target"
  />
</template>
<script>
import CreateForm from "@/components/CreateForm.vue";
import GET from "@/composables/GET";

export default {
  name: "target-create",
  components: { CreateForm },
  data () {
    return {
      typeItems: {
          type: Array
      }
    }
  },
  methods: {
    async getTypes() {
      this.typeItems = await GET("targetType");
      return this.typeItems;
    }
  },
  mounted() {
    this.typeItems = this.getTypes();
  }
};
</script>