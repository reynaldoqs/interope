<template>
<v-app>
  <v-navigation-drawer
    width="220"
    persistent
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
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
import NavComponent from "@/components/shared/NavComponent";
import SideBarComponent from "@/components/shared/SideBarComponent";
export default {
  data() {
    return {
      drawer: true
    };
  },
  components: {
    NavComponent,
    SideBarComponent
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
      //mejorar el drawer
    }
  }
};
</script>

<style scoped>
.dash-board {
  width: 100%;
  height: 100vh;
  display: flex;
}

.side-bar-container {
  height: 100vh;
}

.main-container {
  width: 100%;
}
.my-v-content {
  /*  background-color: #e0e0e0; */
  background-color: white;
}
</style>
