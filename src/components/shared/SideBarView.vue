<template>
  <div class="side-var-view">
    <div class="user-info" v-bind:class="{active: isUserAuthenticated}">
      <div class="top-options">
  
      </div>
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

.top-options {
  width: 100%;
  height: 65px;
}
</style>
