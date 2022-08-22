<template>
  <ListForm
    objectURL="assignedTask"
    childComponent='AssignedTask'
    childCreateComponent='AssignedTaskCreate'
    :objectProps="properties"
    :displayProps="[{label: 'Assigned Person',
                    name: 'person.firstName'},
                    {label: 'Task',
                    name: 'task.description'},
                    {label: 'Type',
                    name: 'type',
                    formatter: formatWordCell},
                    {label: 'Due Date',
                    name: 'dueDate',
                    formatter: formatDateCell},
                    {label: 'Time',
                    name: 'timeOfDay',
                    formatter: formatTimeCell},
                    {label: 'Value',
                    name: 'task.value',
                    formatter: formatMoneyCell},
                    {label: 'Complete',
                    name: 'complete',
                    formatter: formatCompletionCell}]"
    searchByURL='assignedTask'
    objectName="Assigned Task"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import * as formatter from "@/composables/cellFormatter.js";
import getProperties from "@/composables/getProperties.js";
import AssignedTask from "@/types/impl/AssignedTask";

export default {
  name: "assignedTask-list",
  components: { ListForm },
  methods: {
    formatTimeCell (cell){
        return formatter.formatTime(cell.getValue());
    },
    formatCompletionCell (cell){
        return formatter.formatCompletion(cell.getValue());
    },
    formatDateCell (cell){
        return formatter.formatDate(cell.getValue());
    },
    formatMoneyCell (cell){
        return formatter.formatMoney(cell.getValue());
    },
    formatWordCell (cell){
        return formatter.formatWord(cell.getValue());
    }
  }
};
</script>
<script setup>
  let properties = await getProperties(AssignedTask)
</script>