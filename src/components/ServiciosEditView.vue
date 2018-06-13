<template>
<div class="edit-view">
<v-container align-center class="my-container my-buttons">
  <v-layout wrap>
        <v-flex sm12  md6 lg4 align-content-center>
            <v-btn outline round color="primary">Dar de baja</v-btn>
        </v-flex>
        <v-flex sm12  md6 lg4 align-content-center>
            <h3>Cambiar datos</h3>
        </v-flex>
  </v-layout>
  <div class="my-spacer"></div>

  <v-form ref="form" v-model="valid" @submit.prevent="save" lazy-validation>
    <v-layout wrap>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
    <v-text-field 
      v-model="servicio.codigo"
      label="Codigo"
      required
    ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
    <v-text-field
      v-model="servicio.estado"
      label="Estado"
      required
    ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
    <v-text-field
          name="input-7-1"
          label="Label Text"
    ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
    <v-text-field
      v-model="servicio.descripcion"
      label="Descripcion"
      required
      multi-line
      rows=3
    ></v-text-field>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
        <v-select
          :items="formatedAmbientes"
          v-model="servicio.ambientes"
          label="Ambientes"
          item-text="name"
          item-value="id"
          multiple
          chips
          max-height="auto"
          autocomplete
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              :key="JSON.stringify(data.item)"
              close
              class="chip--select-multi"
              @input="data.parent.selectItem(data.item)"
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>    
                  <v-icon color="pink darken-4" v-html="data.item.icono"></v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title ><span class="my-ip">{{data.item.servidor}}</span> {{data.item.url}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex"> 
        <v-select
          v-model="servicio.protocolos"
          :items="items"
          label="Protocolos"
          chips
          tags
        ></v-select>
    </v-flex>

    <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-menu
        ref="menu1"
        :close-on-content-click="false"
        v-model="menu1"
        :nudge-right="40"
        :return-value.sync="servicio.fechaInicioDisponibilidad"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="servicio.fechaInicioDisponibilidad"
          label="Fecha inicio disponibilidad"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="servicio.fechaInicioDisponibilidad" @input="$refs.menu1.save(servicio.fechaInicioDisponibilidad)"></v-date-picker>
      </v-menu>
    </v-flex>

   <v-flex sm12  md6 lg4 align-content-center class="my-padding-flex">
      <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="servicio.fechaFinDisponibilidad"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="servicio.fechaFinDisponibilidad"
          label="Fecha final disponibilidad"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="servicio.fechaFinDisponibilidad" @input="$refs.menu2.save(servicio.fechaFinDisponibilidad)"></v-date-picker>
      </v-menu>
    </v-flex>
   <v-flex sm12  md6 lg6 align-content-center>
    <v-btn
      round
      type="submit"
      :loading="loadingBtn"
      :disabled="loadingBtn"
      color="pink darken-4"
      class="white--text">
                    Guardar
    <v-icon
    right
    dark>save</v-icon>
    </v-btn>

    <v-btn
        round
        @click="cancel"
        :loading="loadingBtn"
        :disabled="loadingBtn"
        color="pink darken-4"
        class="white--text">
    Cancelar
    <v-icon
        right
        dark>cancel</v-icon>
    </v-btn>

   </v-flex>
  </v-layout>
  </v-form>
</v-container>
</div>
</template>
<script>
/* eslint-disable */ 
export default {

  data(){
    return {
      menu1: false,
      menu2: false,
      valid: true,
      select: null,
        items: [
          'http',
          'https',
          'udp'
        ]
    }
  },
  props: {
    loadingBtn:{
      type: Boolean
    },
    servicio: {
      type:Object
    },
    formatedAmbientes:{
      type: Array
    }
},
methods: {
  save(){
    this.$emit("onSave");
  },
  cancel() {
    this.$emit("onCancel");
  }
}
}
</script>
<style scoped>
  .my-ip{
    color: #8BC34A;
    margin-right: 5px;
    font-weight: bold;
  }
</style>
