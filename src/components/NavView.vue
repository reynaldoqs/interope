<template>
<v-toolbar
  app
  color="white"
>
  <v-toolbar-side-icon
    @click.stop="changeDrawer"
    v-if="isLoggedIn"
  ></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down my-buttons">
      <v-btn
        flat
        append
        to="/catalogo"
      >Catálogo</v-btn>
        <v-btn
          v-if="!isLoggedIn"
          flat
          append
          to="/dashboard"
        >dashboard</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <div v-if="isLoggedIn">
      <v-avatar
        :tile="tile"
        :size="avatarSize"
      >
        <img
          src="../assets/person.jpeg"
          alt="avatar"
        >
          </v-avatar>
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <v-btn
              slot="activator"
              icon
            >
              <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Configurar cuenta</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>settings</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile @click="logout">
                  <v-list-tile-title>Salir</v-list-tile-title>
                </v-list-tile>
              </v-list>
              </v-menu>
    </div>
    <div v-else>
      <v-btn
        outline
        round
        color="pink darken-4"
        @click="toLoginPage"
      >Login</v-btn>
    </div>
    </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      avatarSize: 45,
      tile: false
    };
  },
  props: ["isLoggedIn"],
  methods: {
    changeDrawer() {
      this.$emit("changeDrawer");
    },
    logout() {
      this.$emit("onLogout");
    },
    toLoginPage() {
      this.$emit("toLoginPage");
    }
  }
};
</script>

<style scoped>
.nav-view {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-buttons .btn {
  text-transform: initial;
  font-weight: normal;
  color: var(--inter-text-primary);
  font-size: 1.1rem;
}
</style>
