<template>
  <div class="card home-card">
      <div class="card-body">
        <h1 class="card-title">404</h1>
        <h3>Page not found!</h3>
        <img class="logo-img" src="/images/WAHLHALLA-W.png" />
      </div>
  </div>
</template>
 
<script>
export default {
  name: 'callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  }
}
</script>