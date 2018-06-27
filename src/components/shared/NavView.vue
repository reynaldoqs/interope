<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click.stop="changeDrawer" v-if="isLoggedIn"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat append to="/catalogo">Catálogo</v-btn>
      <v-btn v-if="!isLoggedIn" flat append to="/dashboard">dashboard</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
  
      <div  v-if="isLoggedIn" class="user-container">
        <v-avatar :tile="tile" :size="avatarSize">
          <img :src="`https://api.adorable.io/avatar/80/${user.nombres}`">
        </v-avatar>
        <div class="user-information">
        <h3 class="user-name">
          <span class="nombre">{{user.nombres}}</span>
          <span class="apellido">{{user.primerApellido}}</span>
        </h3>
        <p class="user-rol">{{user.rol}}</p>
        </div>
        <v-menu bottom left transition="slide-y-transition">
          <v-btn slot="activator" icon>
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
      <v-btn outline round flat @click="toLoginPage">Login</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters(["user"])
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

.user-container {
  display: inline-flex;
  align-items: center;
}
.user-information {
  padding: 25px 0 15px 10px;
}
.user-name {
  line-height: 16px;
  font-size: 1.1rem;
  color: aliceblue;
  margin: 10px 0 0 0;
}
.nombre {
  text-transform: lowercase;
  display: inline-block;
  margin-right: 5px;
}
.nombre::first-letter {
  text-transform: uppercase;
}
.apellido {
  text-transform: lowercase;
  display: inline-block;
}
.apellido::first-letter {
  text-transform: uppercase;
}
.user-rol {
  color: var(--ds-bg-1);
  text-transform: lowercase;
  font-size: 0.8rem;
}

.user-rol::first-letter {
  text-transform: uppercase;
}
</style>
