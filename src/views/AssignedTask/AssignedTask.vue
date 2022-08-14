<template>
  <UpdateForm
    objectURL="assignedTask"
    :objectProps="[{label: 'Person',
                    name: 'personId',
                    type: 'inputSelect',
                    items : this.personItems,
                    itemDisplay : 'firstName',
                    subOf: 'person'},
                    {label: 'Task',
                    name: 'taskId',
                    type: 'inputSelect',
                    subOf: 'task',
                    items : this.taskItems,
                    itemDisplay : 'description',
                    required: true},
                    {label: 'Type',
                    name: 'type',
                    type: 'inputSelect',
                    items : [{name: 'DAILY'},{name: 'WEEKLY'},{name: 'MONTHLY'},{name: 'YEARLY'}],
                    itemDisplay : 'name',
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
                    type: 'inputCheck'}]"
    objectName="assignedTask"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";

export default {
  name: "assignedTask-update",
  components: { UpdateForm },
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
      var accessToken = await auth0.getTokenSilently();
      this.personItems = await GET("person", accessToken);
      return this.personItems;
    },
    async getTasks() {
      var accessToken = await auth0.getTokenSilently();
      this.taskItems = await GET("task", accessToken);
      return this.taskItems;
    }
  },
  mounted() {
    this.personItems = this.getPersons();
    this.taskItems = this.getTasks();
  }
};
</script>