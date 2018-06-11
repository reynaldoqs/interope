import Vue from "vue";
import Router from "vue-router";
import Home from "../views/UnProtected/Home/Home";
import LoginPage from "../views/UnProtected/LoginPage/LoginPage";
import DashBoard from "../views/Protected/DashBoard/DashBoard";
/* children routes */
import CatalogoCompoent from "@/components/CatalogoComponent";
import ServiciosComponent from "@/components/ServiciosComponent";
import EntidadesComponent from "@/components/EntidadesComponent";
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home,
      children: [{
        path: "/catalogo",
        name: "catalogo",
        component: CatalogoCompoent
      }]
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
      children: [{
          path: "/",
          name: "catalogo",
          component: CatalogoCompoent
        },
        {
          path: "/servicios",
          name: "servicios",
          component: ServiciosComponent
        },
        {
          path: "/entidades",
          name: "entidades",
          component: EntidadesComponent
        }
      ]
    }
  ]
});