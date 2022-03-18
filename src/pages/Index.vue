<template>
  <q-page class="column items-center justify-evenly">
    <LoginForm v-if="!state.loggedUser" />

    <div
      v-show="state.loggedUser"
      class="text-grey-8 column items-center backdrop-blur-6 bg-transparent q-pa-sm q-px-md rounded-borders"
    >
      <q-icon name="r_support_agent" size="xl"></q-icon>
      <p
        class="text-center"
      >Aún no tengo nueva información que mostrarle{{ state.loggedUser ? `, ${state.loggedUser.nombre}` : '' }}.</p>
    </div>
  </q-page>
</template>

<script setup>
import state from 'src/composables/useState.js'
import LoginForm from 'components/LoginForm.vue'

</script>
