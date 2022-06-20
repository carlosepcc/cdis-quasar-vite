<script setup>

import DrawerItem from "components/DrawerItem.vue";
import { ref } from "vue";
import state,{userHasPermission} from "src/composables/useState.js";

// DRAWER
const miniState = ref(true);

const drawerItems = [
  { title: "Inicio", icon: "home", alt: "n", to: "/" },


  {
    title: "Denuncias",
    icon: "r_announcement",
    to: "denuncias",
    forRole: "ROLE_R_DENUNCIA",
  },
  {
    title: "Comisiones Disciplinarias",
    icon: "r_admin_panel_settings",
    to: "comisiones",
    forRole: "ROLE_R_COMISION",
  },
  {
    title: "Usuarios",
    icon: "r_manage_accounts",
    to: "users",
    forRole: "ROLE_R_USUARIO",
  },
  {
    title: "Roles",
    icon: "r_badge",
    to: "roles",
    forRole: "ROLE_R_ROL",
  },
  {
    title: "Declaraciones",
    icon: "r_chat",
    to: "declaraciones",
    forRole: "ROLE_R_DECLARACION",
  },
  {
    title: "Casos",
    icon: "r_assignment_ind",
    to: "casos",
    forRole: "ROLE_R_CASO",
  },
  {
    title: "Resoluciones",
    icon: "r_article",
    to: "resoluciones",
    forRole: "ROLE_R_RESOLUCION",
  },

  // ALL USERS index 6 - 8 //, forRoles: ['Administrador', 'Asesor_de_calidad', 'Coordinador_de_calidad', 'Encargado_de_proyecto', 'Revisor']
  { title: "Ajustes", icon: "settings", to: "settings", separate: true },
  { title: "Ayuda", icon: "help", to: "help" },
  { title: "Acerca de CDIS", icon: "info", to: "about" },
];
</script>

<template>
  <!--MENU LATERAL (DRAWER "gaveta") -->
  <q-drawer
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
    :breakpoint="500"
    bordered
    side="left"
  >
    <q-scroll-area class="fit">
      <q-list>

        <template v-for="drawerItem in drawerItems" :key="drawerItem.title">
          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
              <!--v-if="
                drawerItem.forRole == undefined ||
                (state.loggedUser
                  ? state.loggedUser.permisos.some((iPermisoObject) =>
                      drawerItem.forRole.includes(iPermisoObject.permiso)
                    )
                  : false) /*si el item del drawer no tiene forRole, o el arreglo de permisos del usuario autenticado tiene algún permiso en común con el arreglo forRoles del item, se muestra, de lo contrario no.*/
              "

              v-if="
                drawerItem.forRole == undefined ||
                (state.loggedUser
                  ? state.loggedUser.permisos.some((iPermisoObject) =>
                      drawerItem.forRole === iPermisoObject.permiso
                    )
                  : false) //TODO /*si el item del drawer no tiene forRole, o el arreglo de permisos del usuario autenticado tiene algún permiso en común con el arreglo forRoles del item, se muestra, de lo contrario no.*/
              "-->
            <DrawerItem
              v-bind="drawerItem"
              v-if="
                drawerItem.forRole === undefined ||
                state.loggedUser.permisos.some((permiso) => drawerItem.forRole === permiso) //TODO /*si el item del drawer no tiene forRole, o el arreglo de permisos del usuario autenticado tiene algún permiso en común con el arreglo forRoles del item, se muestra, de lo contrario no.*/
              "
            />
          </transition-group>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
