<template>
  <div class="view-container">
    <ServicioDetailView :servicio="servicio" />
  </div>
</template>

<script>
import serviciosApi from "@/services/serviciosService";
import ServicioDetailView from "@/components/servicios/ServiciosDetailView";

export default {
  data() {
    return {
      servicio: {}
    };
  },
  mounted() {
    serviciosApi
      .getServicio(this.$route.params.id)
      .then(data => (this.servicio = data));
  },
  components: {
    ServicioDetailView
  }
};
</script>
