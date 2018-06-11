<template>
<div class="catalogo">
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        md6
        lg4
        v-for="(servicio, index) in servicios"
        :key="index"
      >
        <a-card :servicio="servicio" />
        </v-flex>

        </v-layout>
  </v-container>
</div>
</template>

<script>
import {getServicios} from '../services/serviciosService';
import CatalogoCard from './CatalogoCard'
export default {
  data() {
    return {
      servicios: []
    }
  },
  components: {
    "a-card": CatalogoCard
  },
  mounted() {
    getServicios().then(data => {
      this.servicios = data.data.servicios
    }).catch(err => console.log(err));
  }
};
</script>

<style scoped>
.catalogo {
  width: 100%;
}
</style>
