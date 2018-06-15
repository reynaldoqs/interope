<template>
  <div class="my-step">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.nombre">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.prefijo">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.tipo">
    <input  class="para-verificar" type="text" v-model="cuerpoSolicitud.descripcion">
    <hr>
    <input  class="para-propiedades" type="text" v-model="newDefinition.prefijo">
    <input  class="para-propiedades" type="text" v-model="newDefinition.tipo">
    <input  class="para-propiedades" type="text" v-model="newDefinition.descripcion">
    <button @click="addDefinition">Hacerlo</button>
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
      this.fullaPropiedades.push(this.newDefinition);
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
</style>
