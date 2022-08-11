<template>
  <ListForm
    objectURL="Task"
    childComponent='Task'
    childCreateComponent='TaskCreate'
    :objectProps="[{label: 'Description',
                    name: 'description'},
                    {label: 'Type',
                    name: 'description',
                    subOf: 'taskType'},
                    {label: 'Target',
                    name: 'description',
                    subOf: 'target'},
                    {label: 'Value',
                    name: 'value'}]"
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

export default {
  name: "task-list",
  components: { ListForm }
};
</script>