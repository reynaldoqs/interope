<template>
  <div class="my-step">
    <p class="inter-p">Este es un subtitulo</p>
    <v-container align-center>
      <v-layout wrap>
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.nombre" label="Nombre" :rules="rules.nombre" required></v-text-field>
        </v-flex>

        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.baseUrl" label="URL base" :rules="rules.baseUrl" required></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.version" label="Versión" :rules="rules.version" required></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.numeroCatalogo"
          label="Número de catalogo" 
          :rules="rules.numeroCatalogo"
          required 
          @input="setToNumber"></v-text-field> 
        </v-flex>
  
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-select :items="metodosOtp" v-model="model.metodo" label="Metodos" single-line dense required :rules="rules.metodo"></v-select>
        </v-flex>
        
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.prefijoOperacion" label="Prefijo operación" :rules="rules.prefijoOperacion" required></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.descripcion"
          label="Descripción"
          :rules="rules.descripcion"
          multi-line 
          rows="3"
          required></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metodosOtp: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"]
    };
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  methods: {
    setToNumber() {
      this.model.numeroCatalogo = parseInt(this.model.numeroCatalogo);
    }
  }
};
</script>

<style>
</style>
