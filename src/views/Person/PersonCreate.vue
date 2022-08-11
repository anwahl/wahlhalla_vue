<template>
  <CreateForm
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
import CreateForm from "@/components/CreateForm.vue";

export default {
  name: "people-create",
  components: { CreateForm }
};
</script>