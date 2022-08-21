<template>
  <ListForm
    objectURL="task"
    childComponent='Task'
    childCreateComponent='TaskCreate'
    :objectProps="properties"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Target',
                    name : 'target.description'},]"
    searchByURL='description'
    objectName="Task"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import getProperties from "@/composables/getProperties.js";
import Task from "@/types/impl/Task";

export default {
  name: "task-list",
  components: { ListForm }
};
</script>
<script setup>
  let properties = await getProperties(Task)
</script>