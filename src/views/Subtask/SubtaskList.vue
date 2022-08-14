<template>
  <ListForm
    :objectURL="'subtask'+ (byAssignedTask ? '/assignedTask/' + byAssignedTask : '')"
    childComponent='Subtask'
    childCreateComponent='SubtaskCreate'
    :objectProps="[{label : 'Description', name : 'description'},
                    {label : 'Task', name : 'description',
                     subOf: 'task',
                     subOfSub: 'assignedTask'}]"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Task',
                    name : 'assignedTask.task.description'}]"
    searchByURL='description'
    objectName="Subtask"
    :byObjectId="byAssignedTask"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";

export default {
  name: "subtask-list",
  components: { ListForm },
  props: {
    byAssignedTask: Number
  }
};
</script>