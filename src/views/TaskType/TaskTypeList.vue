<template>
  <ListForm
    objectURL="taskType"
    childComponent='TaskType'
    childCreateComponent='TaskTypeCreate'
    :objectProps="properties"
    :displayProps="[{label : 'Description',
                    name : 'description'},
                    {label : 'Category',
                    name : 'category',
                    formatter : this.formatWordCell}]"
    searchByURL='description'
    objectName="Task Type"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import getProperties from "@/composables/getProperties.js";
import TaskType from "@/types/impl/TaskType";
import * as formatter from "@/composables/cellFormatter.js";


export default {
  name: "taskType-list",
  components: { ListForm },
  methods: {
    formatWordCell (cell){
        return formatter.formatWord(cell.getValue());
    }
  }
};
</script>
<script setup>
  let properties = await getProperties(TaskType)
</script>