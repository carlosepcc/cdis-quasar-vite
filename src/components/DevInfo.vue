<template>
  <q-card class="q-my-sm">
    <q-card-section>
        <details v-if="state.loggedUser.usuario == 'admin'">
            <summary class="text-grey-9 text-caption">Dev info:</summary>
            <pre class="text-caption bg-dark text-white overflow-auto rounded-borders"  style="height: 40vh;min-height:80px;resize:vertical">
              <slot></slot>
            </pre>
        </details>
    </q-card-section>
  </q-card>
</template>
<script setup>
import state from 'src/composables/useState.js'
</script>
