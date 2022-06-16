<script setup>
const lis = [
  { href: "https://github.com/carlosepcc/cdis-quasar-vite", label: 'github.com / carlosepcc / cdis-quasar-vite' },
  { href: "https://github.com/carlosepcc/cdis", label: 'github.com / carlosepcc / cdis' },
]
</script>
<template>
  <q-page padding>
    <h5>Acerca de CDIS</h5>
<p>Universidad de las Ciencias Informáticas. XAUCE, CDIS. © 2021-2022</p>
    <strong>Código:</strong>
    <ul class=bg-light>
      <li v-for="li in lis" v-bind:key="li.label">
        <q-btn
          :icon="li.icon ? li.icon : 'r_open_in_new'"
          flat
          color="accent"
          no-caps
          :href="li.href"
          :label="li.label"
        />
      </li>
    </ul>

  </q-page>
</template>


