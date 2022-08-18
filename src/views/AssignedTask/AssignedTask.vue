<template>
  <UpdateForm
    :inSeries="inSeries"
    objectURL="assignedTask"
    :objectProps="!inSeries ? [{label: 'Assigned Person',
                    name: 'personId',
                    type: 'inputSelect',
                    items : personItems,
                    itemDisplay : 'firstName',
                    subOf: 'person'},
                    {label: 'Task',
                    name: 'taskId',
                    type: 'inputSelect',
                    subOf: 'task',
                    items : taskItems,
                    itemDisplay : 'description',
                    required: true},
                    {label: 'Due Date',
                    name: 'dueDate',
                    type: 'inputDate',
                    required: true},
                    {label: 'Start Time',
                    name: 'timeOfDay',
                    type: 'inputTime',
                    required: false},
                    {label: 'End Time',
                    name: 'endTimeOfDay',
                    type: 'inputTime',
                    required: false},
                    {label: 'Complete',
                    name: 'complete',
                    type: 'inputCheck'}]
                    :
                    [{label: 'Person',
                    name: 'personId',
                    type: 'inputSelect',
                    items : personItems,
                    itemDisplay : 'firstName',
                    subOf: 'person'},
                    {label: 'Task',
                    name: 'taskId',
                    type: 'inputSelect',
                    subOf: 'task',
                    items : taskItems,
                    itemDisplay : 'description',
                    required: true},
                    {label: 'Start Time',
                    name: 'timeOfDay',
                    type: 'inputTime',
                    required: false},
                    {label: 'End Time',
                    name: 'endTimeOfDay',
                    type: 'inputTime',
                    required: false},
                    {label: 'Complete',
                    name: 'complete',
                    type: 'inputCheck'}]"
    objectName="Assigned Task"
    @onFormSubmit="$emit('onFormSubmit')"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";
import GET from "@/composables/GET";

export default {
  name: "assignedTask-update",
  components: { UpdateForm },
  emits: ['onFormSubmit'],
  props: {
    inSeries: false,
  },
  data () {
    return {
      personItems: {
          type: Array
      },
      taskItems: {
          type: Array
      }
    }
  },
  methods: {
    async getPersons() {
      this.personItems = await GET("person");
      return this.personItems;
    },
    async getTasks() {
      this.taskItems = await GET("task");
      return this.taskItems;
    }
  },
  mounted() {
    this.personItems = this.getPersons();
    this.taskItems = this.getTasks();
  }
};
</script>