<template>
<div class="app">
    <router-view/>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  created () {
    if(this.$store.getters.isUserAuthenticated){
      let token = JSON.parse(localStorage.getItem('user')).accesos.token;
      axios.defaults.headers.common["Authorization"] = token;
    }
  }
};
</script>
