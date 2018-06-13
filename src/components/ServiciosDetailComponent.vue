<template>
  <div class="servicio-detail">
    <h1>SErvicios detail component</h1>
    <pre>
      servicio: 
      {{servicio}}
    </pre>
  </div>
</template>
<script>
import {
  getServicio
} from '@/services/serviciosService';
export default {
  data(){
    return {
      servicio:{}
    }
  },
  mounted () {
       getServicio(this.$route.params.id)
      .then(service => {
        let data = service.data;
        this.servicio = {
          codigo: data.codigo,
          descripcion: data.descripcion,
          estado: data.estado,
          protocolos: data.protocolos,
          fechaInicioDisponibilidad: data.fechaInicioDisponibilidad,
          fechaFinDisponibilidad: data.fechaFinDisponibilidad,
          palabrasClave: data.palabrasClave,
          ambientes: data.ambientes
        }}).catch(err => console.log(err));
  }
}
</script>
