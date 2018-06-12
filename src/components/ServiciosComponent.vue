<template>
  <div class="entidades">
  <v-data-table
    class="elevation-3"
    :headers="headers"
    :items="servicios"
    hide-actions
    :loading="loading"
  >
    <v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>

    <template slot="items" slot-scope="props">
      <td>{{ props.item.datosEntidad.siglaEntidad }}</td>
      <td class="text-xs-left">{{ props.item.datosEntidad.descripcionEntidad }}</td>
      <td class="text-xs-left">{{ props.item.codigo }}</td>
      <td class="text-xs-center">{{ props.item.estado }}</td>
      <td class="text-xs-center">{{ props.item.fechaRegistro | normalDate }}</td>
      <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item.id)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong>This is an extra footer</strong>
      </td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
  </v-data-table>
      <div class="text-xs-center pt-2 my-paginator" @click="updatedPagination" v-if="pages > 1">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    <pre>
      {{servicios}}
    </pre>
  </div>
</template>
<script>
import { getServicios } from '@/services/serviciosService';
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
          text: 'Sigla Entidad', align: 'left', sortable: true,
          value: 'siglaEntidad'
        },
        {text: 'Descripción', value:'descripcion', align:'left', sortable: false},
        {text: 'Codigo', value:'codigo',align:'center', sortable: false},
        {text: 'Estado', value:'estado',align:'center', sortable: false},
        {text: 'Fecha Registro', value: 'FechaRegistro', align: 'center', sortable: true},
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
    editItem(id){
      this.$router.push(`/admin/servicios/edit/${id}`)
    },
    deleteItem(id){
        console.log(id);
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
.estado{
  display: flex;
  align-items: center;
  justify-content: center;
}
.estado::before{
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: rgb(99, 87, 112);  
  margin: 0 20px;
  border-radius: 50%;
}
.estado::before {
  background-color: #009688;
}
.my-paginator {
  max-width: 600px;
  margin: 0 auto;
}
</style>

