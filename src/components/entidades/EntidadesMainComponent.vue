<template>
  <div>
      <search-bar v-on:onInput="search">
        <v-btn flat round>Agregar ambiente<v-icon right>add</v-icon></v-btn>
      </search-bar>
      <v-card>
        <v-card-title>
         <!--  <span class="headline">Configuración del ambiente</span> -->
        </v-card-title>
  
        <v-card-text>
          <data-table-view
            tipo="entidades"
            :loading="loading"
            :datos="entidadesData"
            v-on:onUpdatePagination="updatePagination"></data-table-view>
        </v-card-text>
      </v-card>
      {{dataToSearch}}
  </div>
</template>

<script>
  import entidadesApi from '@/services/entidadesService';
  import DataTableView from '@/components/shared/DataTableView';
  import SearchBar from '@/components/shared/SearchBar';

  export default {
    data() {
      return {
        dataToSearch:'asdad',
        dataview: {},
        entidadesData: {},
        loading: true
      }
    },
    methods: {
      search(value){
        console.log(value);
      },
      updatePagination(pagination) {
        this.loading = true;
        this.callAndFormat(pagination.rowsPerPage, pagination.page);
      },
      callAndFormat(rowsPerPage = 10, page = 1) {
        //mejorr con graphql...
        entidadesApi.getEntidades(rowsPerPage, page).then(data => {
          let headers = ['Nro. Entidad',
            'Descripcion Entidad',
            'Sigla Entidad',
            'Estado', 'Accion'
          ]
          this.entidadesData = {
            totalItems: data.totalEntidades,
            items: data.entidades.map(data => {
              let formated = {
                data1: data.entidad,
                data2: data.desEntidad,
                data3: data.siglaEntidad,
                data4: data.estado,
                id: data.id
              }
              return formated;
            }),
            headers: headers.map(data => {
              let header = {
                text: data,
                align: 'left',
                sortable: true
              }
              return header;
            })
          }
          this.loading = false;
        })
      }
    },
    mounted() {
      this.callAndFormat();
    },
    components: {
      DataTableView,
      SearchBar
    }
  }
</script>