<template>
  <div class="create">
    <v-container align-center class="my-container my-buttons">
<v-form ref="form" @submit.prevent="save">
  <v-layout wrap>
    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.position1"
        label="Codigo"
        :rules ="rules.rule1"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.position2"
        label="Descripición"
        :rules="rules.rule2"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
        <v-select
          :items="protocolos"
          v-model="model.position3"
          label="protocolos"
          single-line
          dense
          required
          :rules="rules.rule3"
        ></v-select>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.position4"
        label="Palabras clave"
        :rules="rules.rule4"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.position5"
        label="Ambientes"
        :rules="rules.rule5"
        required
      ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-text-field 
        v-model="model.position6"
        label="Datos entidad"
        :rules="rules.rule6"
        required
      ></v-text-field>
    </v-flex>
    <v-flex sm12 class="my-buttons">
      <v-btn round 
      type="submit"
      color="primary"
      outline 
      dark>Crear Servicio</v-btn>
    </v-flex>
</v-layout>
</v-form>
  </v-container>

modelo a enviar: {{model}}
servicios: {{servicios}}
  </div>
</template>
<script>
import { postServicio } from '@/services/serviciosService';
export default {
  data(){
    return {
      servicios:[],
      valid:true,
      rules:{
        rule1: [
        v => !!v || 'El codigo es necesario',
        v => (v && v.length <= 50) || 'El tamaño máximo permitido es 50 caracteres'
        ],
        rule2:[
        v => !!v || 'La descripción es necesaria',
        v => (v && v.length <= 500) || 'El tamaño máximo permitido es 500 caracteres'
        ],
        rule3:[
        v => !!v || 'El protocolo es necesario'
        ],
        rule4:[
          v => !! v || 'Las palabras clave son necesarias'
        ],
        rule5:[
          v => !! v || 'Los ambientes son necesarios'
        ],
        rule6: [
          v => !! v || 'Los datos de la entidad son necesarios'
        ]
      
      },
      model: {
        position1:'Codigo prueba Front',
        position2:'Descripción prueba desde el front',
        position3: ['http'],
        position4: ['sena','front'],
        position5: ['5b1fd25affab5b8b549e01f5'],
        position6: {}
      },
      protocolos:['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT']
    }
  },
  methods:{
    save(){
      //para formatear el modelo genérico
      let newServicio = {
        codigo: this.model.position1,
        descripcion: this.model.position2,
        protocolos: this.model.position3,
        palabrasClave: this.model.position4,
        ambientes: this.model.position5,
        datosEntidad: {
          id:"5b1e99371103702ea87fe12f",
          numeroEntidad:2,
          descripcionEntidad:"Servicios de SENARECOM, Ministerio de Mineria",
          siglaEntidad:"SENARECOM"
        }
      }
      console.log(newServicio);
      postServicio(newServicio).then(data => {
        this.$store.dispatch('notification',{message: 'Servicio guardado'})
      }).catch(err => {
        let error = err.response.data.error;
        console.log(error);
        this.$store.dispatch('notification',{message:error, dangerous: true, time:3000})
      });
    }
  }
}
</script>

