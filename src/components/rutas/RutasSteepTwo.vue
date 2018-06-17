<template>
  <div class="my-step">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.nombre">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.prefijo">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.tipo">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.descripcion">
    <hr>
    <button @click="addDefinition">Hacerlo</button>
    <div v-for="(prop, index) in fullaPropiedades" :key="index">
      <pre>
       {{prop}}
      </pre>
    </div>
    <div class="add-card">
      <div class="inter-row to-right">
        <label for="">Prefijo</label><input type="text" v-model="newDefinition.prefijo">
      </div>
      <div class="inter-row to-right">
        <label for="">Prefijo</label><input type="text" v-model="newDefinition.tipo">
      </div>
      <div class="inter-row to-right">
        <label for="">Prefijo</label><input type="text" v-model="newDefinition.descripcion">
      </div>
      <div class="inter-row to-right">
dfdf
      </div>
    </div>
    <pre>
      {{cuerpoSolicitud}}
      full-Propiedades:
      {{fullaPropiedades}}
    </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newDefinition: {},
      fullaPropiedades: []
    };
  },
  props: {
    cuerpoSolicitud: {
      type: Object
    }
  },
  methods: {
    addDefinition() {
      let newDef = Object.assign({}, this.newDefinition);
      this.fullaPropiedades.push(newDef);
    }
  }
};
</script>

<style>
.para-verificar {
  background-color: aquamarine;
  margin: 5px;
  display: block;
}
.para-propiedades {
  background-color: #fea;
  margin: 5px;
  display: block;
}
.add-card {
  background-color: #fea;
  padding: 16px;
}
.add-card input[type="text"] {
  background-color: aqua;
  border-radius: 10px;
}
</style>
