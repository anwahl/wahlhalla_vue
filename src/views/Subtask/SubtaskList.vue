<template>
  <ListForm
    :objectURL="'subtask'+ (byAssignedTask ? '/assignedTask/' + byAssignedTask : '')"
    childComponent='Subtask'
    childCreateComponent='SubtaskCreate'
    :objectProps="properties"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Task',
                    name : 'assignedTask.task.description'}]"
    searchByURL='description'
    objectName="Subtask"
    :byObjectId="byAssignedTask"
    byObject="assignedTaskId"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import getProperties from "@/composables/getProperties.js";
import Subtask from "@/types/impl/Subtask";

export default {
  name: "subtask-list",
  components: { ListForm }
};
</script>
<script setup>
  const props = defineProps({
    byAssignedTask: Number,
  });
  let properties = await getProperties(Subtask, props.byAssignedTask)
</script>