<template>
  <div class="edit-view">
        <div class="my-container"></div>
    <v-container align-center>
         <v-layout wrap>
          <v-flex sm12 align-content-center>
            <h1>Cambiar Datos</h1>
          </v-flex>
         </v-layout>
     <v-layout wrap>
       <v-flex xs12 sm6>
 <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="servicio.codigo"
      label="Codigo"
      required
    ></v-text-field>
    <v-text-field
      v-model="servicio.descripcion"
      label="Descripcion"
      required
    ></v-text-field>
    <v-text-field
      v-model="servicio.estado"
      label="Estado"
      required
    ></v-text-field>
        <v-select
          v-model="servicio.protocolos"
          :items="items"
          label="Protocolos"
          chips
          tags
        ></v-select>
    <v-select
      :items="servicio.ambientes"
      label="Ambientes"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </v-flex>
    </v-layout>
/* Para hacer prueba con ambientes */
    <v-layout row wrap>
      <v-flex xs12 sm6>
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
    </v-layout>
     <button @click="hacer">Hacer la prueba</button>
</v-container>
  </div>
</template>
<script>
/* eslint-disable */ 
export default {

  data(){
    return {
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
    servicio: {
      type:Object
    },
    formatedAmbientes:{
      type: Array
    }
},
methods: {
  hacer(){
    this.$emit("onHacer");
  },
    submit() {
      /*         if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post('/api/submit', {
                  name: this.name,
                  email: this.email,
                  select: this.select,
                  checkbox: this.checkbox
                })
              } */
    },
    clear() {
      this.$refs.form.reset();
    }
}
}
</script>
<style scoped>
.edit-view {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
}
.my-container{
  height: 10px;
  background-color: var(--inter-tertiary);
}
  .my-ip{
    color: #8BC34A;
    margin-right: 5px;
    font-weight: bold;
  }
</style>
