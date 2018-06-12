<template>
<div class="edit-servicios">
  <edit-servicios
    :servicio="servicio"
    v-on:onHacer="hacer"
    :formatedAmbientes="formatedAmbientes"
  />
  <pre>
    cambios:
    {{newServicio}}
      servicio:
    {{servicio}}

    </pre>
</div>
</template>

<script>
/* eslint-disable */
import ServiciosEditView from '@/components/ServiciosEditView';
import {
  getServicio, patchServicio
} from '@/services/serviciosService';
import {
  getAmbientes
} from '@/services/ambientesService';
export default {
  data() {
    return {
      servicio: {},
      oldServicio:{},
      formatedAmbientes:[]
    }
  },
  components: {
    "edit-servicios": ServiciosEditView
  },
  methods: {
    hacer(){
      patchServicio(this.$route.params.id, this.newServicio)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  },
  mounted() {
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
        }
        getAmbientes()
          .then(data => {
            this.formatedAmbientes = data.data.ambientes.map(ambiente => {
              let selectable = {
                id: ambiente.id,
                name:ambiente.nombre,//cambiar en el nestedView el name por su nombre verdadero
                servidor: ambiente.ipServidor,
                url: ambiente.url,
                icono: 'computer'
              }
              return selectable;
            });
            this.oldServicio = Object.assign({},this.servicio);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  computed: {
    newServicio(){
      let Keys = Object.keys(this.servicio).filter(key =>this.servicio[key] !== this.oldServicio[key]);
      let newDatos = {};
      Keys.forEach(key => newDatos[key] = this.servicio[key]);
      return newDatos;
    }
  }
};
</script>

<style>
.edit-servicios {
  padding: 16px 20px;
}
</style>
