import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import router from "./routes/router";
import store from "./store/index";
import "./registerServiceWorker";
import filter from "@/utils/filter.js";

Vue.config.productionTip = false;

new Vue({
  filter,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
