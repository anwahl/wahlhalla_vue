<template>
    <button class="btn btn-primary" @click="$emit('viewEvent')">View {{ item }}</button>
</template>
<script>
  export default {
    emits: ['viewEvent'],
    props: {
        item: String
    }
  };
</script>