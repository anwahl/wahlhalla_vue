<template>
  <ListForm
    objectURL="assignedTask"
    childComponent='AssignedTask'
    childCreateComponent='AssignedTaskCreate'
    :objectProps="[{label: 'Person',
                    name: 'firstName',
                    subOf: 'person'},
                    {label: 'Task',
                    name: 'description',
                    subOf: 'task'},
                    {label: 'Target',
                    name: 'description',
                    subOf: 'target',
                    subOfSub: 'task'},
                    {label: 'Type',
                    name: 'type',
                    formatter: this.formatWord},
                    {label: 'Due Date',
                    name: 'dueDate',
                    formatter: this.formatDate},
                    {label: 'Time',
                    name: 'timeOfDay',
                    formatter: this.formatTime},
                    {label: 'End Time',
                    name: 'endTimeOfDay',
                    formatter: this.formatTime},
                    {label: 'Occurrences',
                    name: 'occurrences'},
                    {label: 'Value',
                    name: 'value',
                    subOf: 'task',
                    formatter: this.formatMoney},
                    {label: 'Complete',
                    name: 'complete'}]"
    :displayProps="[{label: 'Person',
                    name: 'person.firstName'},
                    {label: 'Task',
                    name: 'task.description'},
                    {label: 'Type',
                    name: 'type',
                    formatter: this.formatWordCell},
                    {label: 'Due Date',
                    name: 'dueDate',
                    formatter: this.formatDateCell},
                    {label: 'Time',
                    name: 'timeOfDay',
                    formatter: this.formatTimeCell},
                    {label: 'Value',
                    name: 'task.value',
                    formatter: this.formatMoneyCell},
                    {label: 'Complete',
                    name: 'complete',
                    formatter: this.formatCompletionCell}]"
    searchByURL='assignedTask'
    objectName="AssignedTask"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";
import * as formatter from "@/composables/cellFormatter.js";

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
    },
    formatTime (value){
        return formatter.formatTime(value);
    },
    formatDate (value){
        return formatter.formatDate(value);
    },
    formatMoney (value){
        return formatter.formatMoney(value);
    },
    formatWord (value){
        return formatter.formatWord(value);
    }
  }
};
</script>