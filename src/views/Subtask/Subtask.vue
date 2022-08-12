<template>
  <UpdateForm
    :objectId="this.objectId"
    objectURL="subtask"
    :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true},
                {label: 'Task',
                name: 'assignedTaskId',
                type: 'inputSelect',
                required: true,
                items : asyncOptions,
                itemDisplay : 'description',
                itemSubOf: 'task'}]"
    objectName="Subtask"
  />
</template>
<script setup>
import useAsyncOptions from '@/composables/useAsyncOptions'

const { 
  asyncOptions, 
  evalutating, 
  apiError 
} = useAsyncOptions('assignedTask');
</script>
<script>
import UpdateForm from "@/components/UpdateForm.vue";
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";

export default {
  name: "subtask-update",
  components: { UpdateForm },
  props: {
    objectId: Number
  }
};
</script>