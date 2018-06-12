<template>
<div class="side-var-view">
  <v-list>
    <v-list-tile
      value="true"
      v-for="(link, i) in links"
      :key="i"
    >
      <v-list-tile-action>
        <v-icon v-html="link.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <router-link :to="link.to">
          <v-list-tile-title v-text="link.title"></v-list-tile-title>
        </router-link>
      </v-list-tile-content>
      </v-list-tile>
  </v-list>
</div>
</template>

<script>
export default {
  data() {
    return {
      links: [{
          icon: "supervised_user_circle",
          title: "Usuarios",
          to:"/admin/usuarios"
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
        },{
          icon: "router",
          title: "Rutas",
          to: "/admin/rutas"
        },
        {
          icon: "location_city",
          title: "Entidades",
          to: "/admin/entidades",
        },
        {
          icon: "notifications_active",
          title: "Noticias",
          to: "/admin/noticias"
        }
      ]
    }
  }
};
</script>

<style scoped>

</style>
