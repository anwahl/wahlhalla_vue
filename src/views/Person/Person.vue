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
export default {
  name: "person",
  data() {
    return {
      currentPerson: null,
      message: ''
    };
  },
  methods: {
    getPerson(id) {
      PersonDataService.get(id)
        .then(response => {
          this.currentPerson = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePerson() {
      PersonDataService.update(this.currentPerson.id, this.currentPerson)
        .then(response => {
          console.log(response.data);
          this.message = 'The Person was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletePerson() {
      PersonDataService.delete(this.currentPerson.id)
        .then(response => {
          console.log(response.data);
          this.$router.push('/persons');
        })
        .catch(e => {
          console.log(e);
        });
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