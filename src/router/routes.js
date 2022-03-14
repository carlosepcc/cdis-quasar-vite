const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {path: "", component: () => import("pages/Index.vue")},
      {
        path: "/comisiones",
        component: () => import("src/pages/lists/Comisiones.vue"),
      },
      {
        path: "/denuncias",
        component: () => import("src/pages/lists/Denuncias.vue"),
      },
      {path: "/users", component: () => import("src/pages/lists/Users.vue")},
      {path: "/help", component: () => import("src/pages/Help.vue")},
      {path: "/about", component: () => import("src/pages/About.vue")},
      {path: "/settings", component: () => import("src/pages/Settings.vue")},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
