<template>
<div class="create inter-container">
<v-stepper v-model="mystep">
    <h2 class="inter-h2 step-mod">Registrar una ruta</h2>
    <v-stepper-items class="inter-buttons" v-on:keyup.enter="nextStep">
      <v-stepper-content step="1">
        <rutas-steep-one :model="model" :rules="rules"></rutas-steep-one>
        <div class="step-buttons">
        <v-btn round outline @click.native="$router.go(-1)">Cancelar</v-btn>
        <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <rutas-steep-two :cuerpoSolicitud="model.cuerpoSolicitud"></rutas-steep-two>
        <div class="step-buttons">
        <v-btn round outline @click.native="cancelStep">Voler atrás</v-btn>
        <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="3">
        <rutas-steep-three></rutas-steep-three>
        <div class="step-buttons">
        <v-btn round outline @click.native="cancelStep">Volver atrás</v-btn>
        <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="4">
        <rutas-steep-four></rutas-steep-four>
        <div class="step-buttons">
        <v-btn round outline @click.native="cancelStep">Volver atrás</v-btn>
        <v-btn round class="white--text" @click.native="$store.dispatch('notification',{message:'Ruta Guardada'})">Guardar ruta</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
    <v-stepper-header style="width:300px; margin:0 auto; cursor:pointer">
      <v-stepper-step :complete="mystep > 1" step="1" @click.native="navStep(1)"></v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="mystep > 2 && this.model.metodo === 'POST'" step="2" @click.native="navStep(2)"></v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="mystep > 3" step="3" @click.native="navStep(3)"></v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="mystep > 4" step="4" @click.native="navStep(4)"></v-stepper-step>

    </v-stepper-header>
  </v-stepper>
  <pre>
    {{model}}
  </pre>
</div>
</template>
<script>
import RutasSteepOne from "./RutasSteepOne";
import RutasSteepTwo from "./RutasSteepTwo";
import RutasSteepThree from "./RutasSteepThree";
import RutasSteepFour from "./RutasSteepFour";
export default {
  data() {
    return {
      valid: true,
      mystep: 1,
      steepsRules: [true, false],
      servicios: [],
      steep: 1,
      rules: {
        nombre: [
          v => !!v || "El nombre es necesario",
          v =>
            (v && v.length <= 50) ||
            "El tamaño máximo permitido es 50 caracteres"
        ],
        version: [
          v => !!v || "La versión es necesaria",
          v =>
            (v && v.length <= 9) || "El tamaño máximo permitido es 9 caracteres"
        ],
        numeroCatalogo: [
          v => !!v || "El número de catalogo es necesario",
          v =>
            (v && typeof v === "number") ||
            "El número de catalogo tiene que ser un número"
        ],
        metodo: [v => !!v || "El método es necesario"],
        baseUrl: [v => !!v || "El URL base es necesaria"],
        descripcion: [
          v => !!v || "La descripción es necesaria",
          v =>
            (v && v.length <= 150) ||
            "El tamaño máximo permitido es 150 caracteres"
        ],
        prefijoOperacion: [
          v => !!v || "El prefijo de la operación es necesario",
          v =>
            (v && v.length <= 20) ||
            "El tamaño máximo permitido es 20 caracteres"
        ],
        seguridad: [v => !!v || "La seguridad es necesaria"],
        idServicio: [v => !!v || "El servicio es necesario"]
      },
      model: {
        nombre: "pruebaFront",
        version: "1.v4",
        numeroCatalogo: 12,
        metodo: "POST",
        baseUrl: "/prueba/etc",
        descripcion: "Esta es una prueba desde el front",
        prefijoOperacion: "pruebaUno",
        seguridad: "sin segurisdad",
        /* parametros:[], */
        cuerpoSolicitud: {},
        idServicio: "",
        respuestas: []
      },
      fullPropiedades: [{ nombre: "audiman" }]
    };
  },
  methods: {
    nextStep() {
      if (this.mystep === 1 && this.model.metodo !== "POST") {
        this.mystep = 3;
      } else {
        this.mystep++;
      }
    },
    navStep(data) {
      if (data === 2 && this.model.metodo !== "POST") {
        this.$store.dispatch("notification", {
          message: "El paso 2 es solo para el método POST",
          dangerous: true
        });
      } else {
        this.mystep = data;
      }
    },
    cancelStep() {
      if (this.mystep - 1 === 2 && this.model.metodo !== "POST") {
        this.mystep = this.mystep - 2;
      } else {
        this.mystep--;
      }
    }
  },
  components: {
    RutasSteepOne,
    RutasSteepTwo,
    RutasSteepThree,
    RutasSteepFour
  }
};
</script>
<style>
.step-mod {
  position: relative;
  top: 20px;
}
.step-buttons {
  text-align: right;
  padding-right: 30px;
}
</style>
