<template>
  <div class="my-step">
  
    <p class="inter-p">Este es un subtitulo</p>
    <v-container align-center>
      <v-layout wrap>
        <v-flex sm12 md8 lg8 align-content-center class="my-padding-flex">
          <v-layout wrap>
            <v-flex sm12 md7 lg7 align-content-center>
              <v-text-field v-model="fullCuerpoSolicitud.nombre" :rules="[rules.req, rules.min3, rules.max50]" label="Nombre"></v-text-field>
              <v-text-field v-model="fullCuerpoSolicitud.prefijo" :rules="[rules.req, rules.min3, rules.max50]" label="Prefijo"></v-text-field>
              <v-text-field v-model="fullCuerpoSolicitud.descripcion" :rules="[rules.req, rules.min15, rules.max500]" rows=3 multi-line label="Descripción"></v-text-field>
  
              <v-form v-model="valid" ref="myForm" class="f-form">
                <div class="def-form">
                  <div class="left-container">
                    <v-text-field v-model="newDefinition.nombre" :rules="[rules.req, rules.min3]" ref="valor1" label="Nombre"></v-text-field>
                    <v-select :items="typeP" v-model="newDefinition.tipo" :rules="[rules.req]" ref="valor2" label="Tipo"></v-select>
                    <v-text-field v-model="newDefinition.descripcion" :rules="[rules.min15]" ref="valor3" label="Descripción"></v-text-field>
                    <div class="option-object" v-if="newDefinition.tipo === 'object'">
                      obj options
                    </div>
                    <div class="option-array" v-if="newDefinition.tipo === 'array'">
                      array options
                    </div>
                  </div>
                  <div class="right-container">
                    <v-btn @click="addDefinition" :disabled="!valid" flat icon outline color="indigo">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-form>

            </v-flex>
            <v-flex sm12 md5 lg5 align-content-center>
              <div class="inter-auto-scroll">
                <div v-for="(prop, index) in fullCuerpoSolicitud.propiedades" :key="index">
                  <div class="propiedades-card">
                    <div class="contend">
                      <h3 class="inter-h3">{{prop.nombre}}</h3>
                      <v-btn fab outline small color="primary" @click="removeProp(index)">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
  
        <v-flex sm12 md4 lg4 align-content-center class="my-padding-flex">
          <div class="inter-json">
            <inter-json :data="fullCuerpoSolicitud">
            </inter-json>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VueJsonPretty from "vue-json-pretty";
  export default {
    data() {
      return {
        valid: true,
        formatedPropiedades: {},
        newDefinition: {},
        typeP: [
          "string",
          "boolean",
          "array",
          "object",
          "integer",
          "number",
          "date",
          "datetime"
        ]
      };
    },
    props: {
      fullCuerpoSolicitud: {
        type: Object
      },
      rules: {
        type: Object
      }
    },
    methods: {
      addDefinition() {
  
        /*         console.log(this.$refs.valor1.inputValue);
                 console.log(this.$refs.valor1.valid); */
        if (this.$refs.valor1.valid && this.$refs.valor2.valid && this.$refs.valor3.valid) {
          let newDef = Object.assign({}, this.newDefinition);
          this.addCorrectEval(this.fullCuerpoSolicitud.propiedades, newDef) ?
            this.fullCuerpoSolicitud.propiedades.push(newDef) :
            console.log("Error, nombres duplicados");
          this.$refs.valor1.reset();
          this.$refs.valor2.reset();
          this.$refs.valor3.reset();
        } else {
          this.$store.dispatch('notification', {
            message: 'Datos no validos',
            dangerous: true
          })
        }
  
      },
      removeProp(index) {
        this.fullCuerpoSolicitud.propiedades.splice(index, 1);
      },
      addCorrectEval(receptor = [], obj) {
        //funcion para validar el objeto antes de hacer push
        let flag = true;
        receptor.forEach(valor => {
          if (valor.nombre === obj.nombre) {
            flag = false;
          }
        });
        return flag ? true : false;
      },
      resetObj(obj = {}) {
        Object.keys(obj).map(key => {
          obj[key] = "";
          return key;
        });
      }
    },
    components: {
      "inter-json": VueJsonPretty
    }
  };
</script>

<style>
  .para-verificar {
    background-color: aquamarine;
    margin: 5px;
    display: block;
  }
  
  .propiedades-card {
    width: 100%;
    padding: 5px 15px;
  }
  
  .propiedades-card>.contend {
    padding: 2px 6px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .propiedades-card>.contend>h3 {
    margin-right: auto;
  }
  .f-form{
    width: 100%;
    margin-top: 10px;
  }
  .def-form{
    display: inline-flex;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  }
  .left-container, .right-container{
    padding: 16px;
  }
  .left-container{
    width: 90%;
    height: auto;
    padding-top: 0;
  }
  .right-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
