<template>
  <UpdateForm
    :objectId="this.objectId"
    objectURL="taskType"
    :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true},
                {label: 'Category',
                name: 'category',
                type: 'inputSelect',
                required: true,
                items : [{name: 'CHORE'},{name: 'BILL'},{name: 'APPOINTMENT'},{name: 'LIST'},{name: 'OTHER'}],
                itemDisplay : 'name'}]"
    objectName="Task Type"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";

export default {
  name: "taskType-update",
  components: { UpdateForm },
  props: {
    objectId: Number
  }
};
</script>