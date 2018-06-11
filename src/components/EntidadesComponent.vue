<template>
  <div class="entidades">
  <v-data-table
    class="my-table elevation-3"
    :headers="headers"
    :items="entidades"
    hide-actions
    :loading="loading"
  >
    <v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>

    <template slot="items" slot-scope="props">
      <td>{{ props.item.siglaEntidad }}</td>
      <td class="text-xs-left">{{ props.item.desEntidad }}</td>
      <td class="text-xs-center estado" v-bind:class="{conectado:isConected}">{{ props.item.estado }}</td>
      <td class="text-xs-center">{{ props.item.id }}</td>
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
      <div class="text-xs-center pt-2 my-paginator" @click="updatedPagination">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    <pre>
      {{entidades}}
    </pre>
  </div>
</template>
<script>
import { getEntidades } from '../services/entiadesService';
export default {
  data(){
    return{
      loading:false,
      pages:59,
      pagination:{
        page:1
      },
      entidades:[],
      headers:[
        {
          text: 'Sigla Entidad',
          align: 'left',
          sortable: false,
          value: 'siglaEntidad'
        },
        {text: 'Descripción', value:'desEntidad', align:'center'},
        {text: 'Estado', value:'estado',align:'center'},
        {text: 'ID', value:'id',align:'center'}
      ],

    }
  },
 mounted() {
    this.loading =true;
    getEntidades().then(data => {
      this.pagination.page= data.data.pagina;
      this.pages=data.data.totalPaginas;
      this.entidades = data.data.entidades;
      this.loading = false;
    }).catch(err => console.log(err));
  },
  computed:{
    isConected(){
      return false
    }
  },
  methods:{
    updatedPagination(){
      this.loading = true;
      getEntidades(10,this.pagination.page).then(data => {
      this.pagination.page= data.data.pagina;
      this.pages=data.data.totalPaginas;
      this.entidades = data.data.entidades;
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

