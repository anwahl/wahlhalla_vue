<template>
  <CreateForm
    :objectId="objectId"
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
                itemSubOf: 'task',
                value: byObjectId}]"
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
import { ref, onMounted } from 'vue';
import CreateForm from "@/components/CreateForm.vue";
import GET from "@/composables/GET";

export default {
  name: "subtask-create",
  components: { CreateForm },
  props: {
    objectId: Number,
    byObjectId: Number
  }
};
</script>