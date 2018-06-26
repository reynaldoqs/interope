<template>
  <div class="inter-container">
    <ServicioSCreateView :model="model"  v-on:onSave="save" v-on:onCancel="$router.go(-1)"/>
    <pre>
      {{model}}
    </pre>
  </div>
</template>
<script>
import ServicioSCreateView from "@/components/servicios/ServiciosCreateView";
import { postServicio } from '@/services/serviciosService';
export default {
  data(){
    return {
      model:{
        codigo: "",
        descripcion: "",
        nombre:'',
        palabrasClave: [
        ],
        ambientes: [
        ],
        datosEntidad:{},
        fechaInicioDisponibilidad: null,
        fechaFinDisponibilidad: null,
      }
    }
  },
  components:{
    ServicioSCreateView
  },
  methods:{
    save(){
      postServicio(this.model).then(data => {
        this.$store.dispatch('notification',{message: 'Servicio guardado'})
      }).catch(err => {
        let error = err.response.data.error;
        this.$store.dispatch('notification',{message:error, dangerous: true, time:3000})
      });
    }
  }
}
</script>
<style>
.inter-container{
  padding: 20px;
}
</style>

