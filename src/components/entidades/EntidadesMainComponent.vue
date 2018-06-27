<template>
  <div>
      <search-bar v-on:onInput="search">
        <h2>Entidades</h2>
        <v-btn flat round>Agregar ambiente<v-icon right>add</v-icon></v-btn>
      </search-bar>
      <div class="inter-card-container">
      <v-card>
        <v-card-title>
         <!--  <span class="headline">Configuración del ambiente</span> -->
        </v-card-title>
  
        <v-card-text>
          <data-table-view
            tipo="entidades"
            :loading="loading"
            :datos="requestData"
            v-on:onUpdatePagination="updatePagination"></data-table-view>
        </v-card-text>
      </v-card>
      </div>
  </div>
</template>

<script>
import entidadesApi from "@/services/entidadesService";
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
        entidadesApi
          .searchEntidad(this.searchValue)
          .then(data => this.formatData(data));
      } else {
        let limite =
          pagination.rowsPerPage === -1
            ? this.requestData.totalItems
            : pagination.rowsPerPage;
        let pagina = pagination.page;
        entidadesApi
          .getEntidades(limite, pagina)
          .then(data => this.formatData(data));
      }
    },
    formatData(data) {
      //mejorar con graphql...
      let headers = [
        "Nro. Entidad",
        "Descripcion Entidad",
        "Sigla Entidad",
        "Estado",
        "Accion"
      ];
      this.requestData = {
        totalItems: data.totalEntidades,
        items: data.entidades.map(data => {
          let formated = {
            data1: data.entidad,
            data2: data.desEntidad,
            data3: data.siglaEntidad,
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