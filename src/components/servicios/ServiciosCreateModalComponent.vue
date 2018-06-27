<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" lazy persistent max-width="500px">
    <!--   <v-btn slot="activator" flat round dark>Agregar ambientes<v-icon right>add</v-icon></v-btn> -->
      <v-card>
        <v-form ref="formModal" @submit.prevent="save" v-model="validModal">
        <v-card-title>
          <span class="headline">Configuración del ambiente</span>
        </v-card-title>
  
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Selección de ambiente</v-subheader>
            </v-flex>

            <v-flex xs6>
            <v-select :rules="[rules.req]" :items="ambientes" v-model="ambienteModel.idAmbiente" label="Ambiente" item-value="id" item-text="nombre" max-height="auto" autocomplete>
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
                    <v-list-tile-title v-html="data.item.url"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.ipServidor"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
            </v-select>
            </v-flex>


            <v-flex xs6>
              <v-subheader>URL consumo</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-text-field :rules="[rules.req]" v-model="ambienteModel.pathServicio" label="URL"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-subheader>Protocolo</v-subheader>
            </v-flex>
            <v-flex xs6>
                      <v-select
                      :rules="[rules.req]"
                    :items="protocolos"
                    v-model="ambienteModel.protocolo"
                    label="protocolo"
                    single-line
                  ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-subheader>IP del servidor</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-text-field  :rules="[rules.req, rules.ip]" v-model="ambienteModel.ipServidor" label="IP"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-subheader>ACL<small class="instructions">(Action Control List)</small></v-subheader>
            </v-flex>
            <v-flex xs6>
               <v-checkbox v-model="ambienteModel.acl"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-subheader>JWT<small class="instructions">(Json Web Token)</small></v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-checkbox v-model="ambienteModel.jwt"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-subheader>EXP<small class="instructions">(Expiration)</small></v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-checkbox v-model="ambienteModel.exp"></v-checkbox>
            </v-flex>
          </v-layout>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancel">Cancelar</v-btn>
          <v-btn color="blue darken-1"  type="submit" flat @click.native="save" :disabled="!validModal">Guardar</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import rules from "@/config/formRules";
import ambientesApi from "@/services/ambientesService";
export default {
  data() {
    return {
      validModal: true,
      ambienteModel: {
        acl: false,
        jwt: false,
        exp: false
      },
      ambientes: [],
      protocolos: ["https", "http"]
    };
  },
  props: {
    dialog: {
      type: Boolean
    }
  },
  methods: {
    save() {
      let newAmbiente = Object.assign({}, this.ambienteModel);
      this.$emit("onSave", newAmbiente);
      this.ownReset();
      this.$emit("onCancel");
    },
    cancel() {
      this.$refs.formModal.reset();
      this.ownReset();
      this.$emit("onCancel");
    },
    ownReset() {
      this.$refs.formModal.reset();
      (this.ambienteModel.acl = false),
        (this.ambienteModel.jwt = false),
        (this.ambienteModel.exp = false);
    }
  },
  mounted() {
    ambientesApi
      .getAmbientes()
      .then(data => {
        this.ambientes = data.ambientes;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    rules() {
      return rules;
    }
  }
};
</script>
<style scoped>
.instructions {
  font-weight: lighter;
  margin-left: 5px;
}
</style>
