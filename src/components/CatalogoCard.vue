<template>
<div class="my-card-container">
  <div class="my-card">
    <div>
       <v-avatar
              slot="activator"
              size="40px"
              :tile="true"
            >
              <img
                src="../assets/segip.jpg"
                alt=""
              >
       </v-avatar>
      <h2>{{servicio.sigla}}</h2>
      <div class="my-icons">
     <v-tooltip top>
        <v-icon  slot="activator">subject</v-icon>
        <span>Con documento</span>
     </v-tooltip>
     <v-tooltip top>
        <v-icon class="active" slot="activator">fiber_manual_record</v-icon>
        <span>Activado</span>
     </v-tooltip>
      </div>
    </div>

      <div class="card-content">
        <p>
        {{servicio.descripcion}}
        <div>
          this is 
        </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  props:{
    servicio:{
      type:Object
    }
  }
}
</script>

<style>
.my-card-container {
  width: 100%;
  height: 270px;
  padding: 10px;
}

.my-card {
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  border-radius: 10px;
  overflow: hidden;
  padding: 16px;
  background-color: white;
}

.my-card>div:first-child {
  position: relative;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: flex-end;
}

.my-card h2 {
  margin-right: auto;
  margin-left: 10px;
  color: var(--inter-text-primary);
  font-weight: 400;
  text-transform: capitalize;
  
}

.my-card>div:first-child::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 100%;
  background-color: var(--inter-secondary);
  left: -16px;
  border-radius: 0 10px 10px 0;
}
.card-content {
  height: calc(100% - 50px);
  padding: 20px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.card-content > p{
  color:var(--inter-text-second);
  font-size: .97rem;
  margin-bottom: auto;
}
.card-content > div{
  width: 100%;
  padding: 5px;
  background-color: aquamarine;
}
.my-icons  i {
  margin: 0 8px;
  cursor: pointer;
}
.my-icons .active{
  color: var(--inter-tertiary);
}
</style>
