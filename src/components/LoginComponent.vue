<template>
<div class="login-component">
    <v-form
        @submit.prevent="componentLogin"
        class="my-form"
    >
    <pre>
      login: {{isLoggedIn}}
      state: {{status}}
    </pre>
        <v-text-field
            v-model="username"
            label="Usuario"
            color="pink darken-4"
            required
        ></v-text-field>

            <v-text-field
                v-model="password"
                label="Clave"
                color="pink darken-4"
                required
            ></v-text-field>

                <div class="my-form">
                    <v-btn
                        v-if="!isLoggedIn"
                        type="submit"
                        :loading="status === 'loading'"
                        :disabled="status === 'loading'"
                        color="pink darken-4"
                        class="white--text"
                    >
                        Login
                        <v-icon
                            right
                            dark
                        >person</v-icon>
                            </v-btn>
                            <v-btn
                                v-else
                                outline
                                round
                                color="pink darken-4"
                                @click="componentLogout"
                            >Logout
                                <v-icon
                                    right
                                    dark
                                >person_outline</v-icon>
                                    </v-btn>
                </div>
                </v-form>
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

.my-form {
  padding: 20px;
  text-align: center;
}
</style>
