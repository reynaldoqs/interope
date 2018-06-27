<template>
  <div class="inter-container">
    <search-bar>
      <h3>Lista de ambientes</h3>
      <v-btn flat round @click="$router.push('/admin/ambientes/create')">Agregar un ambiente
        <v-icon right>add</v-icon>
      </v-btn>
    </search-bar>
    <ServicioSCreateView :model="model"  v-on:onSave="save" v-on:onCancel="$router.go(-1)"/>
    <button @click="save">Guardar</button>
    <pre>
      {{model}}
    </pre>
  </div>
</template>
<script>
import ServicioSCreateView from "@/components/servicios/ServiciosCreateView";
import serviciosApi from "@/services/serviciosService";
import SearchBar from "@/components/shared/SearchBar";
export default {
  data() {
    return {
      model: {
        codigo: "",
        descripcion: "",
        nombre: "",
        palabrasClave: [],
        ambientes: [],
        datosEntidad: {},
        fechaInicioDisponibilidad: null,
        fechaFinDisponibilidad: null
      }
    };
  },
  components: {
    ServicioSCreateView,
    SearchBar
  },
  methods: {
    save() {
      serviciosApi.postServicio(this.model);
    }
  }
};
</script>

