<template>
  <div class="my-auto-x-scroll">
    <v-data-table :headers="datos.headers"
    :items="datos.items"
    :pagination.sync="pagination"
    :total-items="datos.totalItems"
    :loading="loading"
    @update:pagination="pagUpdate"
    class="elevation-12"
    >
  
      <template slot="headers" slot-scope="props">
              <tr :active="props.selected">
                <th class="text-xs-left" v-for="(column, index) in props.headers" :key="index">
                  <div class="inter-headers">
                    {{ column.text}}
                  </div>
                </th>
              </tr>
</template>

<template slot="items" slot-scope="props">
  <td :data-metodo="props.item.data1">
    <router-link :to="`${tipo}/detail/${props.item.id}`" class="inter-link">{{ props.item.data1}}</router-link>
  </td>
  <td :data-metodo="props.item.data2">{{ props.item.data2 }}</td>
  <td :data-metodo="props.item.data3">{{ props.item.data3 }}</td>
  <td :data-metodo="props.item.data4">{{ props.item.data4 }}</td>
  <td>
    <div class="hidden-sm-and-down">
      <v-btn icon class="mx-0" @click="$router.push(`/admin/${tipo}/detail/${props.item.id}`)">
        <v-icon >visibility</v-icon>
      </v-btn>
      <v-btn icon class="mx-0" @click="$router.push(`/admin/${tipo}/edit/${props.item.id}`)">
        <v-icon >edit</v-icon>
      </v-btn>
    </div>
    <v-menu bottom left class="hidden-md-and-up">
      <v-btn slot="activator" icon dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
  
        <v-list-tile :to="`${tipo}/detail/${props.item.id}`">
          <v-list-tile-action>
            <v-icon>visibility</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ver detalles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
  
        <v-list-tile :to="`${tipo}/edit/${props.item.id}`">
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Editar</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
  
      </v-list>
    </v-menu>
  </td>
</template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10
      }
    };
  },
  methods: {
    pagUpdate() {
      this.$emit("onUpdatePagination", this.pagination);
    }
  },
  props: {
    datos: {
      type: Object
    },
    tipo: {
      type: String
    },
    loading: {
      type: Boolean
    }
  }
};
</script>
<style>
.inter-headers {
  background-color: transparent;
  font-size: 1.1rem;
  color: var(--ds-txt-1);
  font-weight: 400;
}
.inter-link {
  font-size: 1rem;
  color: var(--ds-bg-3);
  text-decoration: none;
}
.inter-link:hover {
  text-decoration: underline;
}
</style>
