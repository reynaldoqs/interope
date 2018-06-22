<template>
  <div class="inter-container">
    <ServicioSCreateView :model="model"  v-on:onSave="save"/>
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
        codigo: "iop-servicios-fundempresa PRUEBA",
        descripcion: "",
        nombre:'',
        protocolos: [
        ],
        palabrasClave: [
        ],
        ambientes: [
        ],
        datosEntidad:{
          id:'5b1e99371103702ea87fe133'
        }
      }
    }
  },
  components:{
    ServicioSCreateView
  },
  methods:{
    save(plc){
      console.log('save This');
      this.model.palabrasClave = plc;
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
