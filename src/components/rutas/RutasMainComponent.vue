<template>
  <div class="rutas-view inter-container">
    <v-container align-center class="white-container">
      <v-layout wrap>
  
        <v-flex sm12 md6 lg4 align-content-center class="inter-buttons">
          <v-btn round color="primary" @click="$router.push('/admin/rutas/create')">Agregar Ruta</v-btn>
        </v-flex>
        <v-flex sm12 md6 lg4 align-content-center>
          <v-text-field @input="value => buscarRuta(value)" append-icon="search" label="Buscar ruta" hide-details></v-text-field>
        </v-flex>
        <div class="my-spacer"></div>
        <v-flex sm12 class="my-auto-x-scroll">
          <v-data-table :headers="headers" dark :items="rutas" hide-actions :loading="loading">
            <v-progress-linear slot="progress" height="2" color="secondary"></v-progress-linear>
  
          <template slot="items" slot-scope="props" @click="$router.push(`/admin/rutas/detail/${props.item.id}`)">
            <td>{{ props.item.nombre}}</td>
            <td class="text-xs-left">{{ props.item.version }}</td>
            <td class="text-xs-left">{{ props.item.baseUrl }}</td>
            <td class="text-xs-center" :data-metodo="props.item.metodo">{{ props.item.metodo }}</td>
            <td class="text-xs-center">{{ props.item.estado }}</td>
            <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="$router.push(`/admin/rutas/detail/${props.item.id}`)">
                  <v-icon color="pink darken-4">visibility</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="$router.push(`/admin/rutas/edit/${props.item.id}`)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
              </td>
          </template>

<template slot="no-data">
  <v-alert slot="no-results" outline :value="true" color="error" icon="warning">
    No existen resultados.
  </v-alert>
</template>
  </v-data-table>
</v-flex>
      <div class="text-xs-center pt-2 my-paginator" @click="updatedPagination" v-if="pages > 1">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
         </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {
    getRutas,
    searchRuta
  } from "@/services/rutasService";
  export default {
    data() {
      return {
        loading: false,
        pages: 1,
        pagination: {
          page: 1
        },
        rutas: [],
        headers: [{
            text: "Nombre de la ruta",
            align: "left",
            sortable: false,
            value: "nombre"
          },
          {
            text: "Version",
            value: "version",
            align: "left",
            sortable: true
          },
          {
            text: "URL base",
            value: "baseUrl",
            align: "left",
            sortable: true
          },
          {
            text: "Método",
            value: "metodo",
            align: "center",
            sortable: true
          },
          {
            text: "Estado",
            value: "estado",
            align: "center",
            sortable: false
          },
          {
            text: "Acciones",
            value: "name",
            sortable: false
          }
        ]
      };
    },
    mounted() {
      this.loading = true;
      getRutas()
        .then(data => {
          this.pagination.page = data.data.pagina;
          this.pages = data.data.totalPaginas;
          this.rutas = data.data.rutas;
          this.loading = false;
        })
        .catch(err => console.log(err));
    },
    methods: {
      buscarRuta(value) {
        this.loading = true;
        searchRuta(value)
          .then(data => {
            this.rutas = data.data.rutas;
            this.loading = false;
          })
          .catch(err => console.log(err));
      },
      updatedPagination() {
        this.loading = true;
        getRutas(10, this.pagination.page)
          .then(data => {
            this.pagination.page = data.data.pagina;
            this.pages = data.data.totalPaginas;
            this.rutas = data.data.rutas;
            this.loading = false;
          })
          .catch(err => console.log(err));
      }
    }
  };
</script>
<style>
.my-paginator {
  max-width: 800px;
  margin: 0 auto;
}
</style>
