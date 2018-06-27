<template>
  <div>
      <search-bar v-on:onInput="search">
        <h2>Rutas</h2>
        <v-btn flat round>Agregar ruta<v-icon right>add</v-icon></v-btn>
      </search-bar>
      <div class="inter-card-container">
        <v-card>
          <v-card-title>
          <!--  <span class="headline">Configuración del ambiente</span> -->
          </v-card-title>
    
          <v-card-text>
            <data-table-view
              tipo="rutas"
              :loading="loading"
              :datos="requestData"
              v-on:onUpdatePagination="updatePagination"></data-table-view>
          </v-card-text>
        </v-card>
      </div>
  </div>
</template>

<script>
import rutasApi from "@/services/rutasService";
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
        rutasApi
          .searchRuta(this.searchValue)
          .then(data => this.formatData(data));
      } else {
        let limite =
          pagination.rowsPerPage === -1
            ? this.requestData.totalItems
            : pagination.rowsPerPage;
        let pagina = pagination.page;

        rutasApi.getRutas(limite, pagina).then(data => this.formatData(data));
      }
    },
    formatData(data) {
      //mejorar con graphql...
      let headers = ["Nombre Ruta", "Versión", "URL base", "Método", "Acción"];
      this.requestData = {
        totalItems: data.totalRutas,
        items: data.rutas.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.version,
            data3: data.baseUrl,
            data4: data.metodo,
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