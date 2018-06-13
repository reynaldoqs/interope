<template>
  <div class="create">

<v-form ref="form" v-model="valid" @submit.prevent="save">

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.nombre"
        label="Nombre"
        :rules ="rules.nombre"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.version"
        label="Versión"
        :rules="rules.version"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.numeroCatalogo"
        label="Número de catalogo"
        :rules="rules.numeroCatalogo"  
        required
        @change="cambio"
      ></v-text-field>

    </v-flex>


    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.metodo"
        label="Método"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.baseUrl"
        label="URL base"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.descripcion"
        label="Descripción"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.prefijoOperacion"
        label="Prefijo operación"
        required
      ></v-text-field>
    </v-flex>


    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.seguridad"
        label="Seguridad"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.parametros"
        label="Parámetros"
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.cuerpoSolicitud"
        label="Cuerpo Solicitud"
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.respuestas"
        label="Respuestas"
      ></v-text-field>
    </v-flex>

    <v-flex sm12 class="my-buttons">
      <v-btn round 
      type="submit"
      color="primary"
      outline 
      dark>Crear ruta</v-btn>
    </v-flex>
</v-form>
{{model}}
  </div>
</template>
<script>
import { postRuta } from '@/services/rutasService';
export default {
  data(){
    return {
      valid:true,
      rules:{
        nombre: [
        v => !!v || 'El nombre es necesario',
        v => (v && v.length <= 50) || 'El tamaño máximo permitido es 50 caracteres'
        ],
        version:[
        v => !!v || 'La versión es necesaria',
        v => (v && v.length <= 9) || 'El tamaño máximo permitido es 9 caracteres'
        ],
        numeroCatalogo:[
        v => !!v || 'El número de catalogo es necesario',
        v => (v && typeof v === 'number') || 'El número de catalogo tiene que ser un número'
        ]
      
      },
      model: {
        nombre:'',
        version:'',
        numeroCatalogo: 0,
        metodo:['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
        baseUrl:'',
        descripcion:'',
        prefijoOperacion:'',
        seguridad:'',
        parametros:[],
        cuerpoSolicitud:null,
        respuestas:[]
      },
      metodos:[
        'POST',
        'GET',
        'PATCH',
        'DELETE',
        'PUT'
      ]
    }
  },
  methods:{
    cambio(){
       this.model.numeroCatalogo =parseInt(this.model.numeroCatalogo);
    },
    save(){
      console.log('we are the bests');
      postRuta(this.model).then(data => console.log(data)).catch(err => {
        let error = err.response.data.error;
        console.log(error);
        this.$store.dispatch('notification',{message:error, dangerous: true, time:10000})

      });
    }
  }
}
</script>

