<template>
  <div v-if="currentPerson" class="submit-form">
    <form>
      <span class="form-title">Edit Person</span>
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
    <button type="submit" class="btn btn-primary"
      @click="updatePerson(this.currentPerson.id); $emit('onFormSubmit')">
      Update
    </button>
    <button class="btn btn-secondary"
      @click="deletePerson(); $emit('onFormSubmit')">
      Delete
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Person...</p>
  </div>
</template>
<script>
import PUT from "@/composables/PUT";
import DELETE from "@/composables/DELETE";
import GET from "@/composables/GET";
import auth0 from "@/composables/auth0Client";
import { watch } from 'vue';
export default {
  name: "person",
  emits: 'onFormSubmit',
  props:{
    personId: Number
  },
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
    this.getPerson(this.personId);
    watch(() => this.personId, async (newId, oldId) => { 
        this.getPerson(newId);
    });
    
  }
};
</script>