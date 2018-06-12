import Vue from "vue";
import Router from "vue-router";
import Home from "../views/UnProtected/Home/Home";
import LoginPage from "../views/UnProtected/LoginPage/LoginPage";
import DashBoard from "../views/Protected/DashBoard/DashBoard";
/* children routes */
import CatalogoCompoent from "@/components/CatalogoComponent";
import UsuariosComponent from "@/components/UsuariosComponent";
import AmbientesComponent from "@/components/AmbientesComponent";
import ServiciosComponent from "@/components/ServiciosComponent";
import ServiciosEditComponent from "@/components/ServiciosEditComponent";
import RutasComponent from "@/components/RutasComponent";
import EntidadesComponent from "@/components/EntidadesComponent";
import NoticiasComponent from "@/components/NoticiasComponent";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [{
        path: "catalogo",
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
      path: "/admin",
      component: DashBoard,
      children: [{
          path: "",
          name: "catalogo-admin",
          component: CatalogoCompoent
        },
        {
          path: "usuarios",
          name: "usuarios",
          component: UsuariosComponent
        },
        {
          path: "ambientes",
          name: "ambientes",
          component: AmbientesComponent
        },
        {
          path: "servicios",
          name: "servicios",
          component: ServiciosComponent
        },
        {
          path: "servicios/edit/:id",
          name: "edit-servicios",
          component: ServiciosEditComponent
        },
        {
          path: "rutas",
          name: "rutas",
          component: RutasComponent
        },
        {
          path: "entidades",
          name: "entidades",
          component: EntidadesComponent
        },
        {
          path: "noticias",
          name: "noticias",
          component: NoticiasComponent
        }
      ]
    }
  ]
});