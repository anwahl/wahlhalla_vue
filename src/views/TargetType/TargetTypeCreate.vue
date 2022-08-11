<template>
  <CreateForm
    objectURL="targetType"
    :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true}]"
    objectName="Target Type"
  />
</template>
<script>
import CreateForm from "@/components/CreateForm.vue";

export default {
  name: "targetType-create",
  components: { CreateForm }
};
</script>