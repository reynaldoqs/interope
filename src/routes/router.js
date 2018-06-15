import Vue from "vue";
import Router from "vue-router";
import Home from "../views/UnProtected/Home/Home";
import LoginPage from "../views/UnProtected/LoginPage/LoginPage";
import DashBoard from "../views/Protected/DashBoard/DashBoard";
/* children routes */
import CatalogoCompoent from "@/components/CatalogoComponent";
import UsuariosComponent from "@/components/UsuariosComponent";
import AmbientesComponent from "@/components/AmbientesComponent";
//Servicios
import ServiciosMainComponent from "@/components/servicios/ServiciosMainComponent";
import ServiciosEditComponent from "@/components/servicios/ServiciosEditComponent";
import ServiciosDetailComponent from "@/components/servicios/ServiciosDetailComponent";
import ServiciosCreateComponent from "@/components/servicios/ServiciosCreateComponent";
//Rutas
import RutasMainComponent from "@/components/rutas/RutasMainComponent";
import RutasEditComponent from "@/components/rutas/RutasEditComponent";
import RutasCreateComponent from "@/components/rutas/RutasCreateComponent";
import RutasDetailComponent from "@/components/rutas/RutasDetailComponent";
//Fin rutas
import EntidadesComponent from "@/components/EntidadesComponent";
import NoticiasComponent from "@/components/NoticiasComponent";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "catalogo",
          name: "catalogo",
          component: CatalogoCompoent
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/admin",
      component: DashBoard,
      children: [
        {
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
        //Servicios
        {
          path: "servicios",
          name: "servicios",
          component: ServiciosMainComponent
        },
        {
          path: "servicios/create",
          name: "crear-servicio",
          component: ServiciosCreateComponent
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
        //End servicios
        //Rutas components
        {
          path: "rutas",
          name: "rutas",
          component: RutasMainComponent
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
          path: "rutas/detail/:id",
          name: "detail-rutas",
          component: RutasDetailComponent
        },
        //Fin rutas
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
