<template>
  <ListForm
    objectURL="targetType"
    childComponent='TargetType'
    childCreateComponent='TargetTypeCreate'
    :objectProps="[{label : 'Description',
                     name : 'description'}]"
    :displayProps="[{label : 'Description',
                    name : 'description'}]"
    searchByURL='description'
    objectName="Target Type"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";

export default {
  name: "targetType-list",
  components: { ListForm }
};
</script>