<template>
  <div class="create-view">
    <v-container align-center class="inter-buttons">
      <v-form ref="form" @submit.prevent="save" v-model="valid">
        <v-layout wrap>
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-text-field v-model="model.codigo" label="Codigo" :rules="[rules.req, rules.max50]"></v-text-field>
          </v-flex>
  
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-text-field v-model="model.nombre" :rules="[rules.req]" label="Nombre entidad"></v-text-field>
          </v-flex>
  
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-text-field v-model="model.descripcion" label="Descripición" :rules="[rules.req, rules.max500]" multi-line rows=4></v-text-field>
          </v-flex>
  
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-select :items="protocolos" v-model="model.protocolos" label="protocolos" multiple :rules="[rules.req]"></v-select>
          </v-flex>
  
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-text-field v-model="palabra" label="Palabras clave" :rules="[rules.max20, rules.noSpace]" ref="pc"></v-text-field>
            <v-btn @click.native="addPalabra" outline>Add</v-btn>
          </v-flex>
  
          <v-flex sm12 md6 lg4 align-content-center class="my-padding-flex">
            <v-select :items="ambientes" v-model="model.ambientes" label="Ambientes" multiple item-value="id" item-text="nombre" max-height="auto" autocomplete>
              <template slot="selection" slot-scope="data">
                  <span
                      :selected="data.selected"
                      :key="JSON.stringify(data.item)"
                      @input="data.parent.selectItem(data.item)"
                    >
                          {{data.item.nombre}}
                        </span>
</template>

<template slot="item" slot-scope="data">
  <v-list-tile-content>
    <v-list-tile-title v-html="data.item.nombre"></v-list-tile-title>
    <v-list-tile-sub-title v-html="data.item.url"></v-list-tile-sub-title>
  </v-list-tile-content>
</template>
        </v-select>
          </v-flex>

          <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
            <v-text-field 
              v-model="model.position6"
              label="Datos entidad"
              :rules="rules.rule6"
              required
            ></v-text-field>
          </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-menu
        ref="menu1"
        :close-on-content-click="false"
        v-model="menu1"
        :nudge-right="40"
        :return-value.sync="model.fechaInicioDisponibilidad"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="model.fechaInicioDisponibilidad"
          label="Fecha inicio disponibilidad"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="model.fechaInicioDisponibilidad" @input="$refs.menu1.save(model.fechaInicioDisponibilidad)"></v-date-picker>
      </v-menu>
    </v-flex>

   <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="model.fechaFinDisponibilidad"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="model.fechaFinDisponibilidad"
          label="Fecha final disponibilidad"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="model.fechaFinDisponibilidad" @input="$refs.menu2.save(model.fechaFinDisponibilidad)"></v-date-picker>
      </v-menu>
    </v-flex>
          <v-flex sm12 class="my-buttons">
            <v-btn round 
            type="submit"
            color="primary"
            outline
            :disabled="valid"
            @click="save" 
            dark>Crear Servicio</v-btn>
          </v-flex> 
      </v-layout>
      </v-form>
  </v-container>

  </div>
</template>

<script>
  import rules from '@/config/formRules';
  import {
    getAmbientes
  } from "@/services/ambientesService";
  export default {
    data() {
      return {
        menu1: false,
        menu2: false,
        ambientes: [],
        valid: true,
        protocolos: ['https', 'http'],
        palabra: '',
        arrayPalabras: []
      }
    },
    props: {
      model: {
        type: Object
      },
    },
    methods: {
      save() {
        this.$emit('onSave', this.arrayPalabras);
      },
      addPalabra() {
        this.$refs.pc.valid ? this.arrayPalabras.push(this.palabra) : console.log('Dato no valido');
        this.$refs.pc.reset();
      }
    },
    computed: {
      rules() {
        return rules;
      }
    },
    mounted() {
      this.model.palabrasClave = this.arrayPalabras;
      getAmbientes().then(data => {
        this.ambientes = data.data.ambientes;
      }).catch(err => {
        console.log(err.response.data.error);
      })
    }
  }
</script>

