const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {name: "Inicio", path: "", component: () => import("pages/Index.vue")},
      {name: "Comisiones Disciplinarias", path: "/comisiones", component: () => import("src/pages/lists/Comisiones.vue"),},
      {name: "Denuncias", path: "/denuncias", component: () => import("src/pages/lists/Denuncias.vue")},
      {name: "Usuarios", path: "/users", component: () => import("src/pages/lists/Users.vue")},
      {name: "Ayuda", path: "/help", component: () => import("pages/PageHelp.vue")},
      {name: "Acerca de", path: "/about", component: () => import("src/pages/About.vue")},
      {name: "Ajustes", path: "/settings", component: () => import("src/pages/Settings.vue")},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {name : "404",
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
