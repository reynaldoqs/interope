<template>
  <div class="side-var-view">
    <div class="user-info" v-bind:class="{active: isUserAuthenticated}">
      <div class="top-options">
  
      </div>
      <img :src="`https://api.adorable.io/avatar/80/${user.nombres}`">
      <h3 class="user-name">
        <span class="nombre">{{user.nombres}}</span>
        <span class="apellido">{{user.primerApellido}}</span>
      </h3>
      <p class="user-rol">{{user.rol}}</p>
    </div>
    <v-list dark class="my-list">
      <v-list-tile value="true" v-for="(link, i) in links" :key="i" :to="link.to">
        <v-list-tile-action>
          <v-icon v-html="link.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title class="my-list-title" v-text="link.title"></v-list-tile-title>
            <v-list-tile-sub-title>subtitulo</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      links: [
        {
          icon: "supervised_user_circle",
          title: "Usuarios",
          to: "/admin/usuarios"
        },
        {
          icon: "meeting_room",
          title: "Ambientes",
          to: "/admin/ambientes"
        },
        {
          icon: "poll",
          title: "Servicios",
          to: "/admin/servicios"
        },
        {
          icon: "router",
          title: "Rutas",
          to: "/admin/rutas"
        },
        {
          icon: "location_city",
          title: "Entidades",
          to: "/admin/entidades"
        },
        {
          icon: "notifications_active",
          title: "Noticias",
          to: "/admin/noticias"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "isUserAuthenticated"])
  }
};
</script>

<style scoped>
.my-list {
  background-color: transparent !important;
}
.user-info {
  width: 100%;
  height: 240px;
  /* usar color para ajustar el tamaño */
  text-align: center;
  position: relative;
}

.user-info img {
  border-radius: 50%;
}

.user-info.active:before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: #00c853;
  position: absolute;
  top: 125px;
  border-radius: 50%;
  left: 125px;
}
.user-name {
  line-height: 16px;
  font-size: 1.5rem;
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
  color: #a1a2a2;
  text-transform: lowercase;
}

.user-rol::first-letter {
  text-transform: uppercase;
}

.top-options {
  width: 100%;
  height: 65px;
}
</style>
