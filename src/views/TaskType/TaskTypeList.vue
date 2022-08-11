<template>
  <ListForm
    objectURL="taskType"
    childComponent='TaskType'
    childCreateComponent='TaskTypeCreate'
    :objectProps="[{label : 'Description',
                     name : 'description'},
                    {label : 'Category',
                    name : 'category'}]"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Category',
                    name : 'category'}]"
    searchByURL='description'
    objectName="Task Type"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";

export default {
  name: "taskType-list",
  components: { ListForm }
};
</script>