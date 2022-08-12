<template>
  <div>
    <button @click="login">Log out</button>
  </div>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { loginWithRedirect } = useAuth0();

      return {
        login: () => {
          null;
        }
      };
    }
  };
</script>