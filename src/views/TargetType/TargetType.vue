<template>
  <UpdateForm
    :objectId="this.objectId"
    objectURL="targetType"
    :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true}]"
    objectName="Target Type"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";

export default {
  name: "targetType-update",
  components: { UpdateForm },
  props: {
    objectId: Number
  }
};
</script>