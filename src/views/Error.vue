<template>
 <ErrorComponent :error="error"> </ErrorComponent>
</template>
<script>
  export default {
    name: "error-view",
    props: {
      error: {}
    }
  };
</script>
