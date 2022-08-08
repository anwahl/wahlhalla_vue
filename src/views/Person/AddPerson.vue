<template>
  <div class="submit-form">
    <div v-if="!submitted">
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
      <button @click="savePerson" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>Person Created successfully!</h4>
      <button class="btn btn-success" @click="newPerson">Add</button>
    </div>
  </div>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import PersonDataService from "@/services/PersonDataService";
import Person from "@/types/Person";
import POST from "@/composables/POST";
import auth0 from "/auth0Client";

export default class AddPerson extends Vue {
  private person: Person = {
    id: null,
    firstName: "",
    lastName: "",
    email: ""
  };
  async savePerson() {
    let data = {
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      email: this.person.email,
    };
      var accessToken = await auth0.getTokenSilently();
      this.person.id = await POST("person", accessToken, data).id;
  
  }
  newPerson() {
    this.Person = {} as Person;
  }
}
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>