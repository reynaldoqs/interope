<template>
<v-app dark>
  <v-navigation-drawer
    width="220"
    persistent
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
    mini-variant
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
.my-v-content {
  /*  background-color: #e0e0e0; */
  background-color: #313131;
}
</style>
