<template>
  <div class="card errors-container">
    <div class="card-body">
      <h5 class="card-title">ERROR</h5>
      <div class="card-text">
        Wahlhalla has encountered an error: <span class="errors">{{ error }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "error",
    props: {
      error: {}
    }
  };
</script>