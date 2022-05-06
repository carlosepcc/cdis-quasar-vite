<template>
  <q-page padding class="q-gutter-sm">
    <div>Interfaz</div>
    <!-- TABLE / GRID -->
    <q-btn-toggle
      title="Modo de presentación (Tabla o Rejilla)"
      v-model="state.grid"
      flat
      toggle-color="primary"
      :options="[
        { label: 'Vista en Tabla', noCaps: true, value: false, slot: 'tableview' },
        { label: 'Vista por Tarjetas', noCaps: true, value: true, slot: 'gridview' },
      ]"
    >
      <template v-slot:tableview>
        <q-icon name="r_table_chart" class="on-right" />
      </template>

      <template v-slot:gridview>
        <q-icon name="r_grid_view" class="on-right" />
      </template>
    </q-btn-toggle>
    <br />
    <!-- DENSE / NORMAL -->
    <q-btn-toggle
      title="Densidad las filas en vista de tabla (Normal o Denso)"
      v-model="state.dense"
      flat
      class="q-mx-sm"
      toggle-color="primary"
      :options="[
        { label: 'Interfaz normal', noCaps: true, value: false, slot: 'normal' },
        { label: 'Interfaz densa', noCaps: true, value: true, slot: 'dense' },
      ]"
    >
      <template v-slot:normal>
        <q-icon name="r_table_rows" class="on-right" />
      </template>

      <template v-slot:dense>
        <q-icon name="view_headline" class="on-right" />
      </template>
    </q-btn-toggle>
    <DarkModeControl />
<hr/>
    <details>
    <summary>Opciones de desarrollador</summary>
      <span>Base URL</span>
    <q-select id="serverUrlsSelect" v-model="axiosBaseURL" autofocus @change="setBaseURL" :options="baseUrlsArr" />
      <q-input
        label="Personalizada"
      style="max-width: 20em"
      list="serverUrls"
      v-model="axiosBaseURL"
      placeholder="baseURL.."
      @change="setBaseURL"
    />
    <datalist id="serverUrls">
      <option value="http://localhost:8080"></option>
      <option value="http://cdisserver.herokuapp.com"></option>
    </datalist>
    </details>
  </q-page>
</template>

<script setup>

import DarkModeControl from 'components/DarkModeControl.vue';
import { ref } from "vue"
import state from 'src/composables/useState.js'
import { api } from "boot/axios";
const axiosBaseURL = ref(api.defaults.baseURL)
const baseUrlsArr = [axiosBaseURL.value,'http://cdisserver.herokuapp.com','http://localhost:8080']

const setBaseURL = (url = axiosBaseURL.value) => {
  api.defaults.baseURL = url
  console.log(api.defaults.baseURL)
}
</script>
