<template>
  <div class="card home-card">
      <div class="card-body">
        <h1 class="card-title">404</h1>
        <h3>Page not found!</h3>
        <img class="logo-img" src="/images/WAHLHALLA-W.png" />
        <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
        <button class="btn btn-secondary" @click="$router.push('/')">Go Home</button>
      </div>
  </div>
</template>
<script>
export default {
  name: '404'
}
</script>