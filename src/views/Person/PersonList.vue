<template>
  <ListForm
    objectURL="person"
    childComponent='Person'
    childCreateComponent='PersonCreate'
    :objectProps="[{label : 'First Name', name : 'firstName'},
                  {label : 'Last Name', name : 'lastName'},
                  {label : 'E-Mail', name : 'email'}]"
    :displayProps="[{label : 'First Name',
                     name : 'firstName'},
                    {label : 'Last Name',
                     name : 'lastName'}]"
    searchByURL='name'
    objectName="Person"
  />
</template>
<script>
import ListForm from "@/components/ListForm.vue";

export default {
  name: "person-list",
  components: { ListForm }
};
</script>