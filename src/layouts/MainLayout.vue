<script setup>
// Components
import BaseDrawer from 'components/BaseDrawer';
import BaseBrand from 'src/components/BaseBrand';
import UserInfo from 'src/components/UserInfo';
import { ref } from 'vue';
import state from 'src/composables/useState'
import { autorizar } from 'src/composables/useAPI'


// DRAWER
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

console.log("🚀 ~ file: MainLayout.vue ~ line 23 ~ localStorage.getItem('token')", localStorage.getItem('token'))

// Autorizar usuario para persistencia de la sesión
autorizar()

</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="brand-bar">
        <div id="brand-frame" class="text-primary">
<!--          BOTON MENU-->
          <q-btn
            dense
            flat
            round
            icon="menu"
            aria-label="Menú"
            title="Menú"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            <BaseBrand brand="XAUCE" product="CDIS" :generic="'Gestión de Proceso de\nComisión Disciplinaria'" />
          </q-toolbar-title>
        </div>



        <!-- USER -->
        <UserInfo v-if="state.loggedUser" />
        <q-btn
          :dense="state.dense"
          v-else
          flat
          no-caps
          icon="login"
          label="Iniciar Sesión"
          to="/"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <!--MENU LATERAL (DRAWER "gaveta") -->
    <BaseDrawer v-model="leftDrawerOpen" />

    <!-- CONTENEDOR DE PAGINAS -->
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition>
          <keep-alive>
            <component :is="Component" :key="route.name" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>

    <q-footer  style="height:45px" reveal class="bg-secondary text-white">
      <q-toolbar >
        <q-toolbar-title >
          <q-avatar size="sm" color="white">
            <img src="icons/imagotipo-economica.svg" alt="">
          </q-avatar>
        </q-toolbar-title>
        <span style="color: #fffa"  class="text-caption">Universidad de las Ciencias Informáticas. XAUCE, CDIS. © 2011-{{ new Date().getFullYear() }}</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.brand-bar {
  margin-bottom: 2px;
  width: 100%;
  padding-left: 0;
  padding-inline-start: 0;
}
.xedro-bar {
  /* box-shadow: 0 2px 0 0 var(--xedro); just if it's needed outside a colored bar*/
  background: linear-gradient(140deg, var(--xedro) 30%, #fff 80%);

  color: var(--xedro);
}

#brand-frame {
  resize: horizontal;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  height: fit-content;
  width: 35%;
  min-width: fit-content;
  max-width: 24rem;
  border-bottom-right-radius: 90px 100px;
  background: linear-gradient(#fff 50%, #dedede);
  padding: 8px;
  padding-right: 32px;
  -webkit-box-shadow: 2px 0 12px -2px #0005;
  box-shadow: 2px 0 12px -2px #0005;
}
</style>
