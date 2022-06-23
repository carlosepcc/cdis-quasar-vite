<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  brand: { type: String, default: 'XEDRO' },
  product: { type: String, default: 'GESTOR' },
  generic: { type: String },
})

</script>

<template>
  <div class="row">
    <div class="column gt-xs">
      <q-avatar>
        <img src="https://raw.githubusercontent.com/carlosepcc/cdis-quasar-vite/main/src/public/brand/imagotipo-delujo.webp" alt="" width="48" height="48" />
      </q-avatar>
    </div>
    <div class="column">
      <div class="brand text-brand">{{ brand }}</div>
      <div class="row-inline items-center">
        <span class="text-indigo-10 text-bold siglas">{{ product }}</span>
        <pre class="stands gt-sm generico stands">{{ generic }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Electrofied";
  src: url("https://db.onlinewebfonts.com/t/f45d0d0e10eb5171b1ad9ee95d1314f9.ttf")
    format("truetype");
  font-display: swap;
}
/* @font-face {
  font-family: "Aller";
  src: url("https://db.onlinewebfonts.com/t/3bf7501ddcf8338bc9cdcedad10914cb.ttf")
    format("truetype");
  font-display: swap;
} */
.brand-bar {
  margin-bottom: 2px;
  width: 100%;
  padding-left: 0;
  padding-inline-start: 0;
}
.xedro-bar {
  /* box-shadow: 0 2px 0 0 var(--brand); just if it's needed outside a colored bar*/
  background: linear-gradient(140deg, var(--brand) 30%, #fff 80%);
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
.brandi {
  height: 51px;
  width: 51px;
  /* padding-right: 51px; */
}
.i-xedro {
  background: url(https://www.uci.cu/sites/all/themes/uci/images/sprite.png)
    no-repeat 0-1769px;
}
.siglas {
  font-family: Electrofied, sans-serif;
  font-weight: 1000;
  font-size: 18pt;
  color: var(--downcolor);
  background: rgb(
    37,
    33,
    89
  ); /*! VALORES DE COLOR TOMADOS DEL MANUAL DE NORMAS GRÁFICAS DE XEDRO. NO MODIFICAR*/
  background: linear-gradient(
    180deg,
    rgba(37, 33, 89, 1) 0%,
    rgba(51, 59, 146, 1) 50%,
    rgba(21, 13, 66, 1) 50%,
    rgba(53, 62, 115, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stands,
.generico {
  font-family: sans-serif; /*font face Aller has an issue with the "s" lowercase character that makes it look uppercase*/
  display: inline-block;
  max-width: 200px;
  height: 100%;
  color: #726584;
  margin-left: 3.4px;
  font-size: 8pt;
  line-height: 8pt;
}
.brand {
  /* color: var(--brand); only if needed outside quasar */
  color: #E0742D;
  text-transform: uppercase;
  display: block;
  margin-bottom: -12px;
  margin-left: 2px;
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: 0;
}
</style>
