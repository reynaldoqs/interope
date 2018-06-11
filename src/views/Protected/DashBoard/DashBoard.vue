<template>
<v-app>
  <v-navigation-drawer
    width="200"
    persistent
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
    dark
  >
    <SideBarComponent/>
    </v-navigation-drawer>
    <NavComponent v-on:changeDrawer="changeDrawer" />
    <v-content class="my-v-content">
      <router-view/>
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
      drawer: false
    };
  },
  components: {
    NavComponent,
    SideBarComponent,
    CatalogoComponent
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
    }
  }
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
.my-v-content{
  background-color: #dfd2bb;
}
</style>
