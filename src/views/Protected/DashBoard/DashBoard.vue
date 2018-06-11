<template>
  <v-app>
    <v-navigation-drawer
    width="200"
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      dark
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      <NavComponent v-on:changeDrawer="drawer = !drawer"/>
    <v-content>
      <h1>This is the main content</h1>
    </v-content>
  </v-app>
</template>

<script>
import NavComponent from "@/components/NavComponent";
import SideBarComponent from "@/components/SideBarComponent";
import CatalogoComponent from "@/components/CatalogoComponent";
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      miniVariant: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        },
        {
          icon: "person",
          title: "Persons"
        }
      ]
    };
  },
  components: {
    NavComponent,
    SideBarComponent,
    CatalogoComponent
  },
  mounted() {}
};
</script>

<style scoped>
.dash-board {
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  display: flex;
}

.side-bar-container {
  height: 100vh;
  background-color: blueviolet;
}

.main-container {
  width: 100%;
}
</style>
