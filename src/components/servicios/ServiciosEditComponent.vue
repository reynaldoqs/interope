<template>
  <div class="inter-container">
    <edit-servicios
    :servicio="servicio"
    :formatedAmbientes="formatedAmbientes"
    :loadingBtn="loading"
    v-on:onSave="save"
    v-on:onCancel="$router.go(-1)" />
    <pre>
      {{newServicio}}
    </pre>
  </div>
</template>

<script>
/* eslint-disable */
import ServiciosEditView from "@/components/servicios/ServiciosEditView";
import { getServicio, patchServicio } from "@/services/serviciosService";
import { getAmbientes } from "@/services/ambientesService";
export default {
  data() {
    return {
      loading: false,
      servicio: {},
      oldServicio: {},
      formatedAmbientes: []
    };
  },
  components: {
    "edit-servicios": ServiciosEditView
  },
  methods: {
    save() {
      this.loading = true;
      patchServicio(this.$route.params.id, this.newServicio)
        .then(data => {
          this.$store.dispatch("notification", {
            message: "Guardado con éxito"
          });
          this.loading = false;
          this.$router.go(-1);
        })
        .catch(err => {
          let error = err.response.data.error;
          this.$store.dispatch("notification", {
            message: error,
            dangerous: true,
            time: 3500
          });
          this.loading = false;
        });
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
        };
        getAmbientes()
          .then(data => {
            this.formatedAmbientes = data.data.ambientes.map(ambiente => {
              let selectable = {
                id: ambiente.id,
                name: ambiente.nombre, //cambiar en el nestedView el name por su nombre verdadero
                servidor: ambiente.ipServidor,
                url: ambiente.url,
                icono: "computer"
              };
              return selectable;
            });
            this.oldServicio = Object.assign({}, this.servicio);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  computed: {
    newServicio() {
      let Keys = Object.keys(this.servicio).filter(
        key => this.servicio[key] !== this.oldServicio[key]
      );
      let newDatos = {};
      Keys.forEach(key => (newDatos[key] = this.servicio[key]));
      return newDatos;
    }
  }
};
</script>