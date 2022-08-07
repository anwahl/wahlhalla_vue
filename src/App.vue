<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Wahlhalla</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/persons" class="nav-link">People</a>
        </li>
        <li class="nav-item">
          <a href="/person/add" class="nav-link">Add Person</a>
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
export default class App extends Vue {}
</script>