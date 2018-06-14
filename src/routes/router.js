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
import ServiciosDetailComponent from "@/components/ServiciosDetailComponent";
import ServiciosCreateServicio from "@/components/ServiciosCreateServicio";
import RutasComponent from "@/components/RutasComponent";
import RutasEditComponent from "@/components/RutasEditComponent";
import RutasCreateComponent from "@/components/RutasCreateComponent";
import rutascreate2 from "@/components/rutasComponents/RutasCreateComponent";
import EntidadesComponent from "@/components/EntidadesComponent";
//import NoticiasComponent from "@/components/NoticiasComponent";

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
          path: "servicios/create",
          name: "crear-servicio",
          component: ServiciosCreateServicio
        },
        {
          path: "servicios/detail/:id",
          name: "detail-servicios",
          component: ServiciosDetailComponent
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
          path: "rutas/edit/:id",
          name: "edit-rutas",
          component: RutasEditComponent
        },
        {
          path: "rutas/create",
          name: "crear-ruta",
          component: RutasCreateComponent
        },
        {
          path: "entidades",
          name: "entidades",
          component: EntidadesComponent
        },
        {
          path: "noticias",
          name: "noticias",
          //component: NoticiasComponent
          component: rutascreate2
        }
      ]
    }
  ]
});