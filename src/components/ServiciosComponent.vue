<template>
<div class="entidades">
    <v-container align-center class="my-container my-buttons">
         <v-layout wrap>
          <v-flex sm12  md6 lg4 align-content-center>
            <v-btn outline round color="primary" @click="$router.push('/admin/servicios/create')">Agregar Servicio</v-btn>
          </v-flex>
          <v-flex sm12  md6 lg4 align-content-center>
            <v-text-field
              @input = "value => buscarServicio(value)"
              append-icon="search"
              label="Buscar servicio"
              hide-details
            ></v-text-field>
          </v-flex>
  <div class="my-spacer"></div>
<v-flex sm12 class="my-auto-x-scroll">
  <v-data-table
    :headers="headers"
    :items="servicios"
    hide-actions
    :loading="loading"

  >
    <v-progress-linear slot="progress" height="2" color="secondary"></v-progress-linear>

    <template slot="items" slot-scope="props">
      <td>{{ props.item.datosEntidad.siglaEntidad }}</td>
      <td class="text-xs-left">{{ props.item.datosEntidad.descripcionEntidad }}</td>
      <td class="text-xs-left">{{ props.item.codigo }}</td>
      <td class="text-xs-center">{{ props.item.estado }}</td>
      <td class="text-xs-center">{{ props.item.fechaRegistro | normalDate }}</td>
      <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="detailItem(props.item.id)">
            <v-icon color="pink darken-4">visibility</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="editItem(props.item.id)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
        </td>
    </template>
    <template slot="no-data">
      <v-alert slot="no-results"  outline :value="true" color="error" icon="warning">
        No existen resultados para la busqueda.
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
import { getServicios, searchServicio } from '@/services/serviciosService';
import { mapActions } from "vuex";
export default {
  data(){
    return{
      loading:false,
      pages:1,
      pagination:{
        page:1
      },
      servicios:[],
      headers:[
        {
          text: 'Sigla Entidad', align: 'left', sortable: false,
          value: 'siglaEntidad'
        },
        {text: 'Descripción entidad', value:'descripcion', align:'left', sortable: true},
        {text: 'Codigo', value:'codigo',align:'left', sortable: true},
        {text: 'Estado', value:'estado',align:'center', sortable: false},
        {text: 'Fecha Registro', value: 'fechaRegistro', align: 'center', sortable: true},
        { text: 'Acciones', value: 'name', sortable: false }
      ],

    }
  },
 mounted() {
    this.loading =true;
    getServicios().then(data => {
      this.pagination.page= data.data.pagina;
      this.pages=data.data.totalPaginas;
      this.servicios = data.data.servicios;
      this.loading = false;
    }).catch(err => console.log(err));
  },
  computed:{
    isConected(){
      return false
    }
  },
  methods:{
    ...mapActions(["notification"]),
    buscarServicio(value){
      this.loading = true;
      searchServicio(value)
        .then(data =>{
           this.servicios = data.data.servicios;
           this.loading = false;
         })
        .catch(err => console.log(err)); 
    },
    editItem(id){
      this.$router.push(`/admin/servicios/edit/${id}`)
    },
    detailItem(id){
      this.$router.push(`/admin/servicios/detail/${id}`)
    }
    ,
    updatedPagination(){
      this.loading = true;
      getServicios(10,this.pagination.page).then(data => {
      this.pagination.page= data.data.pagina;
      this.pages=data.data.totalPaginas;
      this.servicios = data.data.servicios;
      this.loading = false;
    }).catch(err => console.log(err));
    }
  }
}
</script>
<style escoped>
.entidades{
  padding: 16px 20px;
}
.my-paginator {
  max-width: 600px;
  margin: 0 auto;
}
</style>

