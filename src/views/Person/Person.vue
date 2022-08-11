<template>
  <UpdateForm
    :objectId="this.objectId"
    objectURL="person"
    :objectProps="[{label: 'First Name',
                name: 'firstName',
                type: 'inputText',
                required: true},
                {label: 'Last Name',
                name: 'lastName',
                type: 'inputText',
                required: true},
                {label: 'E-Mail',
                name: 'email',
                type: 'inputText'}]"
    objectName="Person"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";

export default {
  name: "people-create",
  components: { UpdateForm },
  props: {
    objectId: Number
  }
};
</script>