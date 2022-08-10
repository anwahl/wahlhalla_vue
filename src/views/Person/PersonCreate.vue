<template>
  <div class="submit-form">
  <span class="form-title">Add a Person</span>
    <div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="person.firstName"
          name="firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          class="form-control"
          id="lastName"
          required
          v-model="person.lastName"
          name="lastName"
        />
      </div>
      <div class="form-group">
        <label for="email">E-Mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="person.email"
          name="email"
        />
      </div>
      <button @click="savePerson(); $emit('onFormSubmit')" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import type Person from "@/types/Person";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";

export default  {
  name: "person-create",
  emits: 'onFormSubmit',
  data() {
    return {
      person: {
        id: null,
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  methods: {
      async savePerson() {
        let data = {
          // @ts-ignore
          firstName: this.person.firstName,
          // @ts-ignore
          lastName: this.person.lastName,
          // @ts-ignore
          email: this.person.email,
        };
        let accessToken = await auth0.getTokenSilently();
        let result = await POST("person", accessToken, data);
        // @ts-ignore
        this.person.id = result.id;
    }
  }
}
</script>