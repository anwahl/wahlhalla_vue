<template>
  <ListForm
    objectURL="taskType"
    childComponent='TaskType'
    childCreateComponent='TaskTypeCreate'
    :objectProps="properties"
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
import getProperties from "@/composables/getProperties.js";
import TaskType from "@/types/impl/TaskType";

export default {
  name: "taskType-list",
  components: { ListForm }
};
</script>
<script setup>
  let properties = await getProperties(TaskType)
</script>