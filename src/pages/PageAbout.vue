<script setup>
const lis = [
  { href: "https://github.com/carlosepcc/cdis-front", label: 'github.com / carlosepcc / cdis-front' },
  { href: "https://github.com/carlosepcc/cdis", label: 'github.com / carlosepcc / cdis' },
]
</script>
<template>
  <q-page padding>
    <h5>Acerca de CDIS</h5>

    <strong>Código:</strong>
    <ul>
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


