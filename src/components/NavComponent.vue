<template>
<div class="nav-component">
    <NavView
        :isLoggedIn="isUserAuthenticated"
        v-on:onLogout="logout"
        v-on:toLoginPage="toLogin"
        v-on:changeDrawer="changeDrawer" 
    />
</div>
</template>


<script>
import NavView from "./NavView";
import { mapGetters } from "vuex";

export default {
  components: {
    NavView
  },
  methods: {
    changeDrawer() {
      console.log("chaging drawer");
      this.$emit("changeDrawer");
    },
    logout() {
      console.log("loggin out");
    },
    toLogin() {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["isUserAuthenticated"])
  }
};
</script>
