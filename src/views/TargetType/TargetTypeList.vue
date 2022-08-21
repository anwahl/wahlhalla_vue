<template>
  <ListForm
    objectURL="targetType"
    childComponent='TargetType'
    childCreateComponent='TargetTypeCreate'
    :objectProps="properties"
    :displayProps="[{label : 'Description',
                    name : 'description'}]"
    searchByURL='description'
    objectName="Target Type"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import getProperties from "@/composables/getProperties.js";
import TargetType from "@/types/impl/TargetType";

export default {
  name: "targetType-list",
  components: { ListForm }
};
</script>
<script setup>
  let properties = await getProperties(TargetType)
</script>