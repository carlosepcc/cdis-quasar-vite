<script setup>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
const $q = useQuasar()
const darkMode = ref($q.dark.mode)
watch(darkMode, val => $q.dark.set(val))
</script>

<template>
  <div>
    <q-btn-toggle
      v-model="darkMode"
      flat
      no-caps
      toggle-color="primary"
      :options="[
        { value: 'auto', slot: 'auto' },
        { value: false, slot: 'light' },
        { value: true, slot: 'dark' }
      ]"
    >
      <template v-slot:light>
        <div class="row items-center no-wrap">
          <div class="text-center">Clara</div>
          <q-icon right name="r_light_mode" />
        </div>
      </template>

      <template v-slot:auto>
        <div class="row items-center no-wrap">
          <div class="text-center">Sistema</div>
          <q-icon right name="r_brightness_medium" />
        </div>
      </template>

      <template v-slot:dark>
        <div class="row items-center no-wrap">
          <div class="text-center">Oscura</div>
          <q-icon right name="r_dark_mode" />
        </div>
      </template>
    </q-btn-toggle>
  </div>
</template>
