<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <RouterLink to="/" class="navbar-brand">Wahlhalla</RouterLink>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/assignedTasks" class="nav-link">Assigned Task List</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/persons" class="nav-link">People</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/person/add" class="nav-link">Add Person</RouterLink>
        </li>
        <li class="nav-item">
          <Login />
        </li>
        <li class="nav-item">
          <Logout />
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import Login from "@/components/LoginButton.vue";
import Logout from "@/components/LogoutButton.vue";
export default class App extends Vue {}
</script>