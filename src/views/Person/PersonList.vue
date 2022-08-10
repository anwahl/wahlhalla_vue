<template>
  <div class="list row">
    <div class="col-md-18">
      <div class="input-group mb-3">
        
        <input type="text" class="form-control" placeholder="Search by Name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button"
            @click="searchByName">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h4>People List
        <vue-final-modal @closed="retrievePersons" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
          <button class="modal__close" @click="showCreate = false" />
          <PersonCreate @onFormSubmit="showCreate = false" />
        </vue-final-modal>
        <button class="btn btn-primary" @click="showCreate = true">Add a Person</button>
      </h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(person, index) in persons"
          :key="index"
          @click="setActivePerson(person, index)">
          {{ person.lastName }}, {{ person.firstName }}
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
        <vue-final-modal @closed="retrievePersons" v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
          <button class="modal__close" @click="showEdit = false" />
          <Person :personId="currentPerson.id"  @onFormSubmit="showEdit = false" />
        </vue-final-modal>
        <button class="btn btn-primary" @click="showEdit = true">Edit</button>
      </div>
    </div>
  </div>
</template>
<script>
import GET from "@/composables/GET";
import auth0 from "@/composables/auth0Client";
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal';
import PersonCreate from "./PersonCreate.vue";
import Person from "./Person.vue";

export default {
  name: "persons-list",
  components: {VueFinalModal, PersonCreate, Person},
  data() {
    return {
      persons: [],
      currentPerson: null,
      currentIndex: -1,
      name: "",
      showCreate: false,
      showEdit: false
    };
  },
  methods: {
    async retrievePersons() {
      var accessToken = await auth0.getTokenSilently();
      this.persons = await GET("person", accessToken);
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
    async searchByName() {
      var accessToken = await auth0.getTokenSilently();
      this.persons = await GET(`person/name/'${this.name}'`, accessToken);
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