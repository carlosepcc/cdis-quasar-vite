<script setup>
// Components
import DrawerItem from 'components/DrawerItem';
import { ref } from 'vue';
import state from 'src/composables/useState'

// DRAWER
const miniState = ref(false);

const drawerItems = [{ title: "Inicio", icon: "home", alt: "n", to: "/" },

//REVISOR
{ title: 'Denuncias', icon: 'r_announcement', to: 'denuncias', forRole: ['Profesor', 'Estudiante'] },
{ title: 'Comisiones Disciplinarias', icon: 'r_admin_panel_settings', to: 'comisiones', forRole: ['Profesor'] },

{ title: 'Usuarios', icon: 'r_manage_accounts', to: 'users', forRole: ['Administrador'] },


// ALL USERS index 6 - 8 //, forRoles: ['Administrador', 'Asesor_de_calidad', 'Coordinador_de_calidad', 'Encargado_de_proyecto', 'Revisor']
{ title: 'Ajustes', icon: 'settings', to: 'settings', separate: true },
{ title: 'Ayuda', icon: 'help', to: 'help' },
{ title: 'Acerca de', icon: 'info', to: 'about' },
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
            <DrawerItem
              v-if="drawerItem.forRoles == undefined || (state.loggedUser ? state.loggedUser.roles.some(currentRol => drawerItem.forRoles.includes(currentRol)) : false)"
              v-bind="drawerItem"
            />
          </transition-group>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

