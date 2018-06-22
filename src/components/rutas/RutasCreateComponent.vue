<template>
  <div class="create inter-container">
 
      <v-stepper v-model="mystep">
        <h2 class="inter-h2 step-mod">Registrar una ruta</h2>
        <v-stepper-items v-on:keyup.enter="nextStep">
          <v-stepper-content step="1">
            <rutas-steep-one :fullCuerpoSolicitud="fullCuerpoSolicitud" :model="model" :rules="rules" :servicios="servicios"></rutas-steep-one>
            <div class="step-buttons inter-buttons">
              <v-btn round outline @click.native="$router.go(-1)">Cancelar</v-btn>
              <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
            </div>
          </v-stepper-content>
  
          <v-stepper-content step="2">
            <rutas-steep-two :fullCuerpoSolicitud="fullCuerpoSolicitud" :rules="rules"></rutas-steep-two>
            <div class="step-buttons inter-buttons"  >
              <v-btn round outline @click.native="cancelStep">Voler atrás</v-btn>
              <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
            </div>
          </v-stepper-content>
  
          <v-stepper-content step="3">
            <rutas-steep-three :extraParametros="extraParametros" :rules="rules"></rutas-steep-three>
            <div class="step-buttons inter-buttons">
              <v-btn round outline @click.native="cancelStep">Volver atrás</v-btn>
              <v-btn round class="white--text" @click.native="nextStep">Continuar</v-btn>
            </div>
          </v-stepper-content>
  
          <v-stepper-content step="4">
            <rutas-steep-four :fullCuerpoSolicitud="fullCuerpoSolicitud"></rutas-steep-four>
            <div class="step-buttons inter-buttons">
              <v-btn round outline @click.native="cancelStep">Volver atrás</v-btn>
              <v-btn round class="white--text" @click.native="$store.dispatch('notification',{message:'Ruta Guardada'})">Guardar ruta</v-btn>
              <v-btn :disabled="!valid" @click="submit">
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </div>
          </v-stepper-content>
  
        </v-stepper-items>
        <v-stepper-header style="width:300px; margin:0 auto; cursor:pointer">
          <v-stepper-step :complete="mystep > 1" step="1" @click.native="navStep(1)"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="mystep > 2 && this.model.metodo === 'POST' && this.fullCuerpoSolicitud.propiedades.length > 0" step="2" @click.native="navStep(2)"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="mystep > 3" step="3" @click.native="navStep(3)"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="mystep > 4" step="4" @click.native="navStep(4)"></v-stepper-step>
  
        </v-stepper-header>
      </v-stepper>

  </div>
</template>

<script>
  import RutasSteepOne from "./RutasSteepOne";
  import RutasSteepTwo from "./RutasSteepTwo";
  import RutasSteepThree from "./RutasSteepThree";
  import RutasSteepFour from "./RutasSteepFour";
  import rules from "@/config/formRules";
  import {
    getServicios
  } from "@/services/serviciosService";
  import {
    postDefinicion
  } from "@/services/definicionesService";
  import {
    postRuta,
    patchRuta
  } from "@/services/rutasService";
  export default {
    data() {
      return {
        idRutaToBepatched:'',
        valid: true,
        mystep: 1,
        servicios: [],
        steep: 1,
        model: {
          nombre: "pruebaFront",
          version: "1.v4",
          metodo: "POST",
          baseUrl: "/prueba/etc",
          descripcion: "Esta es una prueba desde el front",
          prefijoOperacion: "pruebaUno",
          seguridad: "JWT",
          parametros:[], 
          idServicio: '',
          respuestas: []
        },
        extraParametros:[]
        ,
        extraCuerpoSolicitud: {
            requerido: true,
            descripcion: "Cuerpo de registro de nuevo operador minero",
            contenido: {
              tipoContenido: "application/json",
              idReferencia: ""
            }
          },
          fullCuerpoSolicitud: {
            nombre: "ejemplo1",
            prefijo: "ej1",
            tipo: "object",
            descripcion: "Ejmplo de descripcion",
            propiedades: [],
            idServicio: ''
          }
        
      }
    },
    methods: {
      async submit() 
        {
          this.model.idServicio = this.fullCuerpoSolicitud.idServicio;
          try{
              if(this.idRutaToBepatched === ''){
                const idRuta = await postRuta(this.model);
                this.idRutaToBepatched = idRuta.data.id;
              }
              const idDefinition = await postDefinicion(this.fullCuerpoSolicitud);
              this.extraCuerpoSolicitud.contenido.idReferencia = idDefinition.data._id;
              this.model.cuerpoSolicitud = Object.assign({},this.extraCuerpoSolicitud);
              await patchRuta(this.idRutaToBepatched,{cuerpoSolicitud:this.extraCuerpoSolicitud})
              this.$store.dispatch('notification',{message:'Ruta guardada'})
          }
          catch(e) {
            this.$store.dispatch('notification',{message:e.response.data.error, dangerous: true})
          }
        }
      ,
      clear() {
        console.log("this is clear");
        console.log(this.$refs.form.inputs);
        //this.$refs.form.reset(); 
      },
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
    computed: {
      rules() {
        return rules;
      }
    },
    mounted() {
      getServicios()
        .then(data => {
          this.servicios = data.data.servicios.map(serv => {
            let newSer = {
              id: serv.id,
              descripcion: serv.datosEntidad.descripcionEntidad,
              sigla: serv.datosEntidad.siglaEntidad
            };
            return newSer;
          });
        })
        .catch(err => {
          this.$store.dispatch("notification", {
            message: err.response.data.error,
            dangerous: true
          });
        });
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
