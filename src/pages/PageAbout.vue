<script setup>
const lis = [
  {
    href: "https://github.com/carlosepcc/cdis-quasar-vite",
    label: "github.com / carlosepcc / cdis-quasar-vite",
  },
  {
    href: "https://github.com/carlosepcc/cdis",
    label: "github.com / carlosepcc / cdis",
  },
];
</script>
<template>
  <q-page padding>
    <h5>Acerca de CDIS</h5>
    <p>Sistema para la gestión del Proceso de Comisión Disciplinaria en la Facultad 4</p>
    <p>Universidad de las Ciencias Informáticas. XAUCE, CDIS. © 2021-2022</p>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Código:</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <ul>
          <li v-for="li in lis" v-bind:key="li.label">
            <q-btn
              :icon="li.icon ? li.icon : 'r_open_in_new'"
              flat
              color=""
              no-caps
              :href="li.href"
              :label="li.label"
            />
          </li>
        </ul>
      </q-card-section>
    </q-card>

  </q-page>
</template>
