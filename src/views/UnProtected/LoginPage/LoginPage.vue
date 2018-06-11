<template>
<div class="login">
    <div class="left-section"></div>
    <div class="right-section"></div>
    <div class="login-container">
        <div class="login-form">
            <LoginComponent
                :isLoggedIn="isUserAuthenticated"
                :status="authStatus"
                v-on:onLogin="login"
                v-on:onLogout="logout"
            />
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginComponent from "@/components/LoginComponent";
export default {
  name: "LoginPage",
  components: {
    LoginComponent
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    ...mapActions(["logout"]),
    login(creds) {
      this.$store
        .dispatch("login", creds)
        .then(() => this.$router.push("/dashboard"));
    }
  },
  computed: {
    ...mapGetters(["isUserAuthenticated", "authStatus"])
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  --right-size: 350px;
}

.left-section {
  background-color: var(--inter-secondary);
  width: calc(100% - var(--right-size));
  height: 100%;
}

.right-section {
  background-color: var(--inter-primary);
  width: var(--right-size);
  height: 100%;
}

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: calc(var(--right-size) / 2);
  /* Quitar para el responsive */
  position: absolute;
}

.login-form {
  background-color: var(--inter-clean-color);
  border-radius: 5px;
  width: 400px;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
</style>
