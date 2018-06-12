import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import router from "./routes/router";
import store from "./store/index";
import "./registerServiceWorker";

Vue.filter("normalDate", function (value) {
  if (!value) return "";
  let date = new Date(value);
  let month = date.getMonth();
  let day = date.getDay();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${date.getFullYear()}/${month}/${day}`;
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");