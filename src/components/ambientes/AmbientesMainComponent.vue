<template>
  <div>
    <search-bar v-on:onInput="search">
      <h3>Lista de ambientes</h3>
      <v-btn flat round @click="$router.push('/admin/ambientes/create')">Agregar un ambiente
        <v-icon right>add</v-icon>
      </v-btn>
    </search-bar>
  </div>
</template>
<script>
import SearchBar from "@/components/shared/SearchBar";
export default {
  components: {
    SearchBar
  },
  methods: {
    search(value) {
      console.log(value);
    }
  }
};
</script>

