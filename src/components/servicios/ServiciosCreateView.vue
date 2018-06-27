<template>
  <div class="inter-card-container">
    <v-card>
       <v-form ref="form" @submit.prevent="save" v-model="valid">
      <v-card-title>
        <span class="headline">Nuevo servicio</span>
      </v-card-title>  
      <v-card-text>
        <v-layout row wrap>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Código del servicio</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="model.codigo" label="Código" :rules="[rules.req, rules.max50, rules.noSpace]"></v-text-field>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Nombre del servicio</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field  v-model="model.nombre" :rules="[rules.req]" label="Nombre"></v-text-field>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Fecha inicio de disponibilidad</v-subheader>
            </v-flex>
            <v-flex xs7>
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
                  label="Inicio"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="model.fechaInicioDisponibilidad" @input="$refs.menu1.save(model.fechaInicioDisponibilidad)"></v-date-picker>
              </v-menu>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Fecha final de disponibilidad</v-subheader>
            </v-flex>
            <v-flex xs7>
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
                  label="Final"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="model.fechaFinDisponibilidad" @input="$refs.menu2.save(model.fechaFinDisponibilidad)"></v-date-picker>
              </v-menu>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Descripción del servicio</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="model.descripcion" label="Descripición" :rules="[rules.req, rules.max500]" multi-line rows=3 ></v-text-field>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Palabras clave</v-subheader>      
            </v-flex>
            <v-flex xs7>
              <v-layout row wrap>
                <v-flex xs10>
                  <v-text-field ref="pc" v-model="palabra" label="Palabra clave" :rules="[rules.max20, rules.noSpace]" ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-btn @click.native="addPalabra" outline round fab small style="position:realive; top:20px;"><v-icon>add</v-icon></v-btn>
                </v-flex>
              </v-layout>   
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Selección entidad</v-subheader>
            </v-flex>
            <v-flex xs7>
            <v-select :items="entidades" v-model="model.datosEntidad" label="Entidad" item-value="datosToBeDispatched" item-text="siglaEntidad" max-height="auto" autocomplete>
              <template slot="selection" slot-scope="data">
                    <span
                        :selected="data.selected"
                        :key="JSON.stringify(data.item)"
                        @input="data.parent.selectItem(data.item)"
                      >
                            {{data.item.siglaEntidad}}
                          </span>
                </template>

                <template slot="item" slot-scope="data">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.desEntidad"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.siglaEntidad"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
            </v-select>
            </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm6>
            <v-layout row wrap>
            <v-flex xs5>
              <v-subheader>Agregar ambientes</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-btn  @click.stop="modal = true" flat>Agregar ambiente<v-icon right dark>add</v-icon></v-btn>
            </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink" flat @click="cancel" >Cancelar</v-btn>
          <v-btn color="pink" flat
            type="submit"
            :disabled="!valid"
            @click.native="save" >Guardar</v-btn>
        </v-card-actions>
      </v-card-actions>
       </v-form>
        <modal-component :dialog="modal" v-on:onSave="saveAmbiente" v-on:onCancel="cancelModal"></modal-component>
    </v-card>
  </div>
</template>

<script>
import rules from "@/config/formRules";
import ServiciosCreateModalComponent from "@/components/servicios/ServiciosCreateModalComponent";
import entidadesApi from "@/services/entidadesService";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      entidades: [],
      valid: true,
      palabra: "",
      arrayPalabras: [],
      modal: false
    };
  },
  props: {
    model: {
      type: Object
    }
  },
  methods: {
    save() {
      this.$emit("onSave");
    },
    cancel() {
      this.$emit("onCancel");
    },
    cancelModal() {
      this.modal = false;
    },
    addPalabra() {
      if (!this.arrayPalabras.includes(this.palabra)) {
        this.$refs.pc.valid
          ? this.arrayPalabras.push(this.palabra)
          : console.log("Dato no valido");
      }
      //un error al hacer reset
      this.$refs.pc.reset();
    },
    saveAmbiente(ambiente) {
      //siguiente codigo,solo porque el emitter de vue emite 2 veces
      if (!Object.values(ambiente).some(val => typeof val === "object")) {
        this.model.ambientes.push(ambiente);
      }
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  mounted() {
    this.model.palabrasClave = this.arrayPalabras;

    entidadesApi.getEntidades(150).then(data => {
      this.entidades = data.entidades.map(entidad => {
        return (entidad = {
          datosToBeDispatched: {
            id: entidad.id,
            numeroEntidad: entidad.entidad,
            descripcionEntidad: entidad.desEntidad,
            siglaEntidad: entidad.siglaEntidad
          },
          siglaEntidad: entidad.siglaEntidad,
          desEntidad: entidad.desEntidad,
          urlImagen: entidad.urlImagen
        });
      });
    });
  },
  components: {
    ModalComponent: ServiciosCreateModalComponent
  },
  beforeDestroy() {
    this.$off("onSave");
  }
};
</script>

