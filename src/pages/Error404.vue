<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div
        class="text-h2"
        style="opacity:.4"
      >Ups. Nada aquí {{ state.loggedUser ? `, ${state.loggedUser.nombre}` : '' }}...</div>

      <q-btn class="q-mt-xl" unelevated to="/" label="Volver al inicio" no-caps />
    </div>
  </div>
</template>

<script setup>
import state from 'src/composables/useState'
</script>
