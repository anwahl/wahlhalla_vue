<template>
  <div class="list row">
    <div class="col-md-18">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchByName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h4>People List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(person, index) in persons"
          :key="index"
          @click="setActivePerson(person, index)"
        >
          {{ person.lastName }}, {{ person.firstName }} ({{ person.email }})
        </li>
      </ul>
    </div>
    <div class="col-md-12">
      <div v-if="currentPerson">
        <h4>Person</h4>
        <div>
          <label><strong>First Name:</strong></label> {{ currentPerson.firstName }}
        </div>
        <div>
          <label><strong>Last Name:</strong></label> {{ currentPerson.lastName }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentPerson.email }}
        </div>
        <a class="badge badge-warning"
          :href="'/person/' + currentPerson.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Person...</p>
      </div>
    </div>
  </div>
</template>
<script>
import PersonDataService from "@/services/PersonDataService";
export default {
  name: "persons-list",
  data() {
    return {
      persons: [],
      currentPerson: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrievePersons() {
      PersonDataService.getAll()
        .then(response => {
          this.persons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievePersons();
      this.currentPerson = null;
      this.currentIndex = -1;
    },
    setActivePerson(person, index) {
      this.currentPerson = person;
      this.currentIndex = index;
    },
    
    searchByName() {
      PersonDataService.findByName(this.name)
        .then(response => {
          this.persons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePersons();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>