<template>
  <CreateForm
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
import CreateForm from "@/components/CreateForm.vue";

export default {
  name: "taskType-create",
  components: { CreateForm }
};
</script>