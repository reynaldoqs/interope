<template>
  <div class="my-auto-x-scroll">
    <v-data-table :headers="datos.headers" :items="datos.items" :pagination.sync="pagination" :total-items="datos.totalItems" :loading="loading">
  
      <template slot="headers" slot-scope="props">
            <tr :active="props.selected">
              <th class="text-xs-left" v-for="(column, index) in props.headers" :key="index">
                {{ column.text}}
              </th>
            </tr>
</template>

<template slot="items" slot-scope="props">
  <td :data-metodo="props.item.data1">
    {{ props.item.data1}}</td>
  <td :data-metodo="props.item.data2">{{ props.item.data2 }}</td>
  <td :data-metodo="props.item.data3">{{ props.item.data3 }}</td>
  <td :data-metodo="props.item.data4">{{ props.item.data4 }}</td>
  <td>
    <v-menu bottom left>
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
    },
    watch: {
      pagination: {
        handler() {
          this.$emit('onUpdatePagination', this.pagination)
        },
        deep: true
      }
    }
  }
</script>