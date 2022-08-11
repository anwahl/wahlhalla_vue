<template>
  <ListForm
    objectURL="target"
    childComponent='Target'
    childCreateComponent='TargetCreate'
    :objectProps="[{label : 'Description', name : 'description'},
                    {label : 'Type', name : 'description',
                     subOf: 'targetType'}]"
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

export default {
  name: "target-list",
  components: { ListForm }
};
</script>