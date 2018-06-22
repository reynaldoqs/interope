<template>
  <div class="my-step">
    <p class="inter-p">Este es un subtitulo</p>
    <v-container align-center>
      <v-layout wrap>
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.nombre" label="Nombre" :rules="[rules.req, rules.min3, rules.max50]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.baseUrl" label="URL base" :rules="[rules.req, rules.noSpace]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.version" label="Versión" :rules="[rules.req, rules.max9]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-select :items="metodosOtp" v-model="model.metodo" label="Metodos" dense :rules="[rules.req]"></v-select>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.prefijoOperacion" label="Prefijo operación" :rules="[rules.req, rules.max20]"></v-text-field>
        </v-flex>
  
        <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
          <v-text-field v-model="model.descripcion" label="Descripción" :rules="[rules.req, rules.max150]" multi-line rows="3"></v-text-field>
        </v-flex>
  
        <v-flex xs12 sm8 md8>
  
          <v-select :items="servicios" v-model="fullCuerpoSolicitud.idServicio" label="Servicio" :rules="[rules.req]" item-value="id" item-text="sigla" max-height="auto" autocomplete>
            <template slot="selection" slot-scope="data">
              <span
                  :selected="data.selected"
                  :key="JSON.stringify(data.item)"
                  @input="data.parent.selectItem(data.item)"
                >
                      {{data.item.sigla}}
                    </span>
            </template>

            <template slot="item" slot-scope="data">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.descripcion"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.sigla"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
        </v-select>

      </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metodosOtp: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
      FilteredIdServicios: ""
    };
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    servicios: {
      type: Array
    },
    fullCuerpoSolicitud:{
      type: Object
    }
  },
  methods: {
    setToNumber() {
      this.model.numeroCatalogo = parseInt(this.model.numeroCatalogo);
    },
    selectItem(data) {
      console.log(data);
    }
  }
};
</script>

<style>
</style>
