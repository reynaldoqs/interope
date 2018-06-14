<template>
  <div class="create">
    <v-container align-center class="my-container my-buttons">
<v-form ref="form" v-model="valid" @submit.prevent="save">
  <v-layout wrap>
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
        @input="cambio"
      ></v-text-field>

    </v-flex>


    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
        <v-select
          :items="metodosOtp"
          v-model="model.metodo"
          label="Metodos"
          single-line
          dense
          required
          :rules="rules.metodo"
        ></v-select>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.baseUrl"
        label="URL base"
        :rules="rules.baseUrl"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.descripcion"
        label="Descripción"
        :rules="rules.descripcion"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.prefijoOperacion"
        label="Prefijo operación"
        :rules="rules.prefijoOperacion"
        required
      ></v-text-field>
    </v-flex>


    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.seguridad"
        label="Seguridad"
        :rules="rules.seguridad"
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

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
        <v-select
          :items="servicios"
          v-model="model.idServicio"
          label="Servicio"
          single-line
          dense
          required
          :rules="rules.idServicio"
        ></v-select>
    </v-flex>

    <v-flex sm12 class="my-buttons">
      <v-btn round 
      type="submit"
      color="primary"
      outline 
      dark>Crear ruta</v-btn>
    </v-flex>
</v-layout>
</v-form>
  </v-container>

modelo a enviar: {{model}}
servicios: {{servicios}}
  </div>
</template>
<script>
import { postRuta } from '@/services/rutasService';
import { getServicios } from '@/services/serviciosService';
export default {
  data(){
    return {
      servicios:[],
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
        ],
        metodo:[
          v => !! v || 'El método es necesario'
        ],
        baseUrl:[
          v => !! v || 'El URL base es necesaria'
        ],
        descripcion: [
          v => !! v || 'La descripción es necesaria',
          v => (v && v.length <= 150) || 'El tamaño máximo permitido es 150 caracteres'
        ],
        prefijoOperacion:[
          v => !! v || 'El prefijo de la operación es necesario',
          v => (v && v.length <= 20) || 'El tamaño máximo permitido es 20 caracteres'
        ],
        seguridad:[
          v => !! v || 'La seguridad es necesaria'
        ],
        idServicio:[
          v => !! v || 'El servicio es necesario'
        ]
      
      },
      model: {
        nombre:'pruebaFront',
        version:'1.v4',
        numeroCatalogo: 12,
        metodo:'POST',
        baseUrl:'/prueba/etc',
        descripcion:'Esta es una prueba desde el front',
        prefijoOperacion:'pruebaUno',
        seguridad:'sin segurisdad',
/*         parametros:[],
        cuerpoSolicitud:{}, */
        idServicio:"",
        respuestas:[]
      },
      metodosOtp:['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT']
    }
  },
  mounted(){
    getServicios()
              .then(data => {
                this.servicios = data.data.servicios.map(serv => {
/*                   let servicio ={
                    id: serv.id,
                    descripcionEntidad: serv.datosEntidad.descripcionEntidad,
                    siglaEntidad: serv.datosEntidad.siglaEntidad
                  } */
                  return serv.id
                })
              })
              .catch(err => console.log(err))
  },
  methods:{
    cambio(){
       this.model.numeroCatalogo =parseInt(this.model.numeroCatalogo);
    },
    save(){
      postRuta(this.model).then(data => console.log(data)).catch(err => {
        let error = err.response.data.error;
        console.log(error);
        this.$store.dispatch('notification',{message:error, dangerous: true, time:3000})

      });
    }
  }
}
</script>

