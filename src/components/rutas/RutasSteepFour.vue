<template>
  <div class="my-step">
    <pre>
      {{fullCuerpoSolicitud}}
    </pre>
    <button @click="pushAllPropiedades">Probar al server</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    fullCuerpoSolicitud: {
      type: Object
    }
  },
  methods: {
    pushAllPropiedades() {
      axios
        .post(
          "https://test.agetic.gob.bo/apigateway/definiciones",
          this.fullCuerpoSolicitud
        )
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.response.data.error);
        });

      /*       this.fullCuerpoSolicitud.propiedades.map(value => {
        
      });
      Promise.all([p1, p2, p3, p4, p5]).then(values => { 
        console.log(values);
      }, reason => {
        console.log(reason)
      }); */
    }
  }
};
</script>

<style>
</style>
