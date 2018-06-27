<template>
<div class="app">
    <router-view/>
    <v-snackbar
      :timeout="time"
      v-model="isOn"
      right
      top
      multi-line
      white
    >
      <span v-bind:class="[dangerous ? 'dangerous': 'safe']">{{ message }}</span>
      <v-icon class="dangerous" v-if="dangerous">error</v-icon>
      <v-icon class="safe" v-else>check_circle</v-icon>
    </v-snackbar>
</div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { BASE_URL } from "./config/config.js";

export default {
  name: "App",
  created() {
    //hacer un archivo para configurar los defaults de axios
    axios.defaults.baseURL = BASE_URL;
    //configurando la autorizacion de axios si el usuario esta en el storage
    if (this.$store.getters.isUserAuthenticated) {
      let token = JSON.parse(localStorage.getItem("user")).accesos.token;
      axios.defaults.headers.common["Authorization"] = token;
    }
  },
  computed: {
    ...mapGetters(["isOn", "dangerous", "time", "message"])
  }
};
</script>
<style>
.dangerous {
  color: #f44336;
}
.safe {
  color: #4caf50;
}
</style>
