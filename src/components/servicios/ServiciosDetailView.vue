<template>
  <div class="servicios-view inter-mid-container">
    <div class="inter-title">
      <h2>
        {{servicio.codigo}}
      </h2>
    </div>
    <pre>
      {{servicio}}
    </pre>
  </div>
</template>
<script>
export default {
  props:['servicio']
}
</script>
<style scoped>
  .inter-title {
    width: 100%;
    background-color: var(--inter-secondary);
    height: 200px;
    text-align: center;
    padding: 16px;
  }
  .inter-title > h2 {
    color: var(--inter-clean-color);
    text-transform: uppercase;
  }
</style>

