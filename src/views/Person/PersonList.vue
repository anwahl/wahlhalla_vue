<template>
  <ListForm
    objectURL="person"
    childComponent='Person'
    childCreateComponent='PersonCreate'
    :objectProps="properties"
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
import getProperties from "@/composables/getProperties.js";
import Person from "@/types/impl/Person";

export default {
  name: "person-list",
  components: { ListForm }
};
</script>
<script setup>
  let properties = await getProperties(Person)
</script>