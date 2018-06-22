<template>
  <div class="view-container">
    <ServicioDetailView :servicio="servicio" />
  </div>
</template>

<script>
  import {
    getServicio
  } from '@/services/serviciosService';
  import ServicioDetailView from '@/components/servicios/ServiciosDetailView';
  
  export default {
    data() {
      return {
        servicio: {}
      }
    },
    mounted() {
      getServicio(this.$route.params.id)
        .then(service => this.servicio = service.data
        ).catch(err => console.log(err));
    },
    components: {
      ServicioDetailView
    }
  }
</script>
