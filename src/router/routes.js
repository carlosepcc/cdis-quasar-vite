const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Inicio",
        path: "",
        component: () => import("pages/PageIndex.vue"),
      },
      {
        name: "Resoluciones",
        path: "/resoluciones",
        component: () => import("pages/ListPages/PageResoluciones.vue"),
      },
      {
        name: "Comisiones Disciplinarias",
        path: "/comisiones",
        component: () => import("pages/ListPages/PageComisiones.vue"),
      },
      {
        name: "Denuncias",
        path: "/denuncias",
        component: () => import("pages/ListPages/PageDenuncias.vue"),
      },
      {
        name: "Usuarios",
        path: "/users",
        component: () => import("pages/ListPages/PageUsers.vue"),
      },
      {
        name: "Roles",
        path: "/roles",
        component: () => import("pages/ListPages/PageRoles.vue"),
      },
      {
        name: "Casos disciplinarios",
        path: "/casos",
        component: () => import("pages/ListPages/PageCasos.vue"),
      },
      {
        name: "Declaraciones",
        path: "/declaraciones",
        component: () => import("pages/ListPages/PageDeclaraciones.vue"),
      },
      {
        name: "Ayuda",
        path: "/help",
        component: () => import("pages/PageHelp.vue"),
      },
      {
        name: "Acerca de",
        path: "/about",
        component: () => import("pages/PageAbout.vue"),
      },
      {
        name: "Ajustes",
        path: "/settings",
        component: () => import("pages/PageSettings.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: "404",
    path: "/:catchAll(.*)*",
    component: () => import("pages/PageError404.vue"),
  },
];

export default routes;
