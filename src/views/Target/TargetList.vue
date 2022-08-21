<template>
  <ListForm
    objectURL="target"
    childComponent='Target'
    childCreateComponent='TargetCreate'
    :objectProps="properties"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Type',
                    name : 'targetType.description'}]"
    searchByURL='description'
    objectName="Target"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import getProperties from "@/composables/getProperties.js";
import Target from "@/types/impl/Target";

export default {
  name: "target-list",
  components: { ListForm }
};
</script>
<script setup>
  let properties = await getProperties(Target)
</script>