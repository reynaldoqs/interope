<template>
  <div class="my-step">
    <v-container align-center>
      <v-layout wrap>
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field ref="step3form" v-model="parametro.ubicacion" label="Ubicación" :rules="[rules.req, rules.max20, rules.noSpace]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="parametro.nombre" label="Nombre" :rules="[rules.req, rules.max20]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="parametro.descripcion" label="Descripción" :rules="[rules.req, rules.max500]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-select :items="tipos" v-model="parametro.tipo" label="Tipo" dense :rules="[rules.req]"></v-select>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-select :items="myFormato" v-model="parametro.formato" label="Formato" ></v-select>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-switch
          v-model="parametro.requerido"
          :label="`Requerido: ${parametro.requerido.toString()}`"
        ></v-switch>
        </v-flex>
        <button @click="cleanIt">Clean it</button>
      <pre>
        {{parametro}}
      </pre>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {  
        parametro: {
          ubicacion:'',
          nombre:'',
          descripcion: '',
          tipo:'',
          formato:null,
          requerido:false

        },
        tipos:["string", "integer", "date", "object"],
        tiposFormato:[]
      }
    },
    props: {
      extraParametros: {
        type: Array
      },
      rules: {
        type: Object
      }
    },
    methods:{
      cleanIt(){
        console.log(this.$refs.step3form);
        this.$refs.step3form.reset();
      }
    },
    computed:{
      myFormato(){
        switch (this.parametro.tipo) {
          case 'date':
            return ['DD/MM/YYYY', 'DD/MM/YY', 'YYYY/MM/DD'] 
            break;

          default:
            return ['int32'];
            break;
        }
      
      }
    }
  }
</script>

<style>
  
</style>
