<template>
    <div class="login-component">
        <pre>
            login: {{isLoggedIn}}
            state: {{status}}
        </pre>
        <form @submit.prevent="componentLogin">
        <div class="inter-login">
          <input type="text" autofocus placeholder="usuario" v-model="username"><v-icon>person</v-icon>
        </div>
        <div class="inter-login">
          <input type="password" placeholder="contraseña" v-model="password"><v-icon>lock</v-icon>
        </div>
            <div class="inter-buttons" style="text-align:center">
                <v-btn v-if="!isLoggedIn" type="submit" :loading="status === 'loading'" :disabled="status === 'loading'" class="white--text" round>
                    Login
                <v-icon right dark>person</v-icon>
                </v-btn>
                <v-btn v-else round @click="componentLogout" class="white--text">Logout
                    <v-icon right dark>person_outline</v-icon>
                </v-btn>
            </div>
        </form>
  
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "scriales",
      password: "123456"
    };
  },
  props: ["isLoggedIn", "status"],
  methods: {
    componentLogin() {
      this.$emit("onLogin", {
        usuario: this.username,
        clave: this.password
      });
    },
    componentLogout() {
      this.$emit("onLogout");
    }
  }
};
</script>

<style scoped>
.login-component {
  padding: 30px 16px;
}
.inter-login {
  width: 90%;
  margin: 0 auto;
  height: 40px;
  background-color: #e6cdca;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 2px 10px 2px 5px;
  margin-bottom: 40px;
  margin-top: 20px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
}
i {
  color: var(--inter-primary);
  user-select: none;
}
input[type="text"],
input[type="password"] {
  border: none;
  width: 100%;
  height: 35px;
  padding: 5px 10px;
  color: var(--inter-primary);
  font-size: 1.2rem;
}
input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}
::-webkit-input-placeholder {
  font-weight: lighter;
}
::-moz-placeholder {
  font-weight: lighter;
}
:-ms-input-placeholder {
  font-weight: lighter;
}
:-moz-placeholder {
  font-weight: lighter;
}
</style>
