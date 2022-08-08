<template>
  <div v-if="currentPerson" class="edit-form">
    <h4>Person</h4>
    <form>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName"
          v-model="currentPerson.firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName"
          v-model="currentPerson.lastName"
        />
      </div>
      <div class="form-group">
        <label><strong>E-mail</strong></label>
        <input type="text" class="form-control" id="email"
          v-model="currentPerson.email"
          />
      </div>
    </form>
    <button class="badge badge-danger mr-2"
      @click="deletePerson">
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updatePerson">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Person...</p>
  </div>
</template>
<script>
import PersonDataService from "@/services/PersonDataService";
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import GET from "@/composables/GET";
import auth0 from "/auth0Client";
export default {
  name: "person",
  data() {
    return {
      currentPerson: null,
      message: ''
    };
  },
  methods: {
    async getPerson(id) {
      var accessToken = await auth0.getTokenSilently();
      this.currentPerson = await GET(`person/${id}`, accessToken);
    },
    async updatePerson(id) {
      var accessToken = await auth0.getTokenSilently();
      await PUT(`person/${this.currentPerson.id}`, accessToken, this.currentPerson);
    },
    async deletePerson() {
      var accessToken = await auth0.getTokenSilently();
      await DELETE(`person/${this.currentPerson.id}`, accessToken);
    }
  },
  mounted() {
    this.message = '';
    this.getPerson(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>