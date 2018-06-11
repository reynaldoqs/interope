<template>
<v-toolbar app>
    <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
    <v-btn
        icon
        @click.stop="changeMiniVariant"
    >
        <v-icon>vertical_split</v-icon>
        </v-btn>
        <v-toolbar-title v-if="!isLoggedIn">Interoperabilidad</v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down my-buttons">
            <v-btn
                flat
                append
                to="/catalogo"
            >Catalogo</v-btn>
                <v-btn
                    flat
                    append           
                    to="/login"
                >Login</v-btn>
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
                    >
                        <v-btn
                            slot="activator"
                            icon
                            transition="slide-y-transition"
                        >
                            <v-icon>keyboard_arrow_down</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile
                                    v-for="(item, i) in items"
                                    :key="i"
                                >
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
      tile: false,
      items: [
        {
          title: "audiman"
        },
        {
          title: "Seruer"
        }
      ]
    };
  },
  props: ["isLoggedIn"],
  methods: {
    changeDrawer() {
      this.$emit("changeDrawer");
    },
    changeMiniVariant() {
      console.log("somwthing here");
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
  background-color: aquamarine;
}
.my-buttons .btn {
  text-transform: initial;
  font-weight: normal;
  color: var(--inter-text-primary);
  font-size: 1.1rem;
}
</style>
