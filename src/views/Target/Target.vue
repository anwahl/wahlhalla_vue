<template>
  <UpdateForm
    :objectId="this.objectId"
    objectURL="target"
    :objectProps="[{label: 'Description',
                name: 'description',
                type: 'inputText',
                required: true},
                {label: 'Type',
                name: 'typeId',
                type: 'inputSelect',
                required: true,
                items : this.typeItems,
                itemDisplay : 'description'}]"
    objectName="Target"
  />
</template>
<script>
import UpdateForm from "@/components/UpdateForm.vue";
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";

export default {
  name: "target-update",
  components: { UpdateForm },
  props: {
    objectId: Number
  },
  data () {
    return {
      typeItems: {
          type: Array
      }
    }
  },
  methods: {
    async getTypes() {
      var accessToken = await auth0.getTokenSilently();
      this.typeItems = await GET("targetType", accessToken);
      return this.typeItems;
    }
  },
  mounted() {
    this.typeItems = this.getTypes();
  }
};
</script>