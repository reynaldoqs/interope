<template>
  <div>
    <search-bar v-on:onInput="search">
      <h2>Servicios</h2>
      <v-btn flat round @click="$router.push('/admin/servicios/create')">Agregar servicio
        <v-icon right>add</v-icon>
      </v-btn>
    </search-bar>
  
    <div class="inter-card-container">
      <div class="inter-instructions">
        Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc.
      </div>
      <v-card>
  
        <v-card-text>
          <data-table-view tipo="servicios" :loading="loading" :datos="requestData" v-on:onUpdatePagination="updatePagination"></data-table-view>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import serviciosApi from "@/services/serviciosService";
import DataTableView from "@/components/shared/DataTableView";
import SearchBar from "@/components/shared/SearchBar";

export default {
  data() {
    return {
      dataToSearch: "asdad",
      dataview: {},
      requestData: {},
      loading: true,
      searchValue: ""
    };
  },
  methods: {
    search(value) {
      this.searchValue = value;
      this.callApi();
    },
    updatePagination(pagination) {
      this.callApi(pagination);
    },
    callApi(pagination = "") {
      this.loading = true;
      //la paginacion se lanza a buscar en el API cada vez que el search cambia la paginacion, el if es para evitar ese comportamiento
      if (this.searchValue.length > 1) {
        serviciosApi
          .searchServicio(this.searchValue)
          .then(data => this.formatData(data));
      } else {
        let limite =
          pagination.rowsPerPage === -1
            ? this.requestData.totalItems
            : pagination.rowsPerPage;
        let pagina = pagination.page;

        serviciosApi
          .getServicios(limite, pagina)
          .then(data => this.formatData(data));
      }
    },
    formatData(data) {
      //mejorar con graphql...
      let headers = [
        "Nombre del Servicio",
        "Sigla Entidad",
        "Código",
        "Estado",
        "Acción"
      ];
      this.requestData = {
        totalItems: data.totalServicios,
        items: data.servicios.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.datosEntidad.siglaEntidad,
            data3: data.codigo,
            data4: data.estado,
            id: data.id
          };
          return formated;
        }),
        headers: headers.map(data => {
          let header = {
            text: data,
            align: "left",
            sortable: true
          };
          return header;
        })
      };
      this.loading = false;
    }
  },
  components: {
    DataTableView,
    SearchBar
  }
};
</script>
