<template>
  <div class="card home-card">
      <div class="card-body">
        <h1 class="card-title">Wahlhalla</h1>
        <h3>House Management</h3>
        <img class="logo-img" src="/images/WAHLHALLA-W.png" />
      </div>
  </div>
  <About> </About>
</template>
 
<script>
import About from '@/components/About.vue';

export default {
  name: 'home-view',
  components: {
    About
  }
}
</script>
<style>
  img.logo-img {
    border-radius: 250px;
  }
</style>