<template>
  <div class="search-bar inter-buttons">
    <v-layout row wrap class="text-xs-center text-md-left">
      <v-flex xs12 sm6 class="parche-feo">
        <slot></slot>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-md-right">
        <div class="search-item extra-margin">
          <label class="hidden-sm-and-down">Busqueda</label>
          <div class="search-input">
            <input type="text" v-model="busqueda" autofocus>
            <v-icon>search</v-icon>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busqueda: ""
    };
  },
  watch: {
    busqueda: {
      handler() {
        this.$emit("onInput", this.busqueda);
      }
    }
  }
};
</script>

<style scoped>
.search-bar {
  padding: 5px 16px;
  width: 100%;
  min-height: 80px;
  background-color: var(--ds-bg-1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.extra-margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
label {
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.1rem;
}
.parche-feo {
  display: inline-flex;
  align-items: center;
}
.parche-feo > * {
  margin-top: 10px;
  margin-bottom: 10px;
}
.search-item {
  width: 260px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
}

.search-input {
  width: 100%;
  background-color: transparent;
  height: 34px;
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 17px;
  padding: 4px 8px 4px 12px;
}

i {
  color: var(--inter-primary);
  user-select: none;
}

input[type="text"] {
  border: none;
  width: calc(100% - 22px);
  height: 26px;
  font-size: 1.1rem;
}

input[type="text"]:focus {
  outline: none;
}
</style>


