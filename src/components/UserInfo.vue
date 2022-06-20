<script setup>
import DarkModeControl from './DarkModeControl.vue';
import state from "src/composables/useState.js"
import { useQuasar } from "quasar";
import { useRouter } from "vue-router"
const $router = useRouter()
const $q = useQuasar()
const logout = () => {
  $q.dialog({
    title: 'Confirme cerrar sesión',
    message: 'Deberá iniciar sesión la próxima vez que desee utilizar la aplicación.',
    cancel: true,
    persistent: true,
    color: 'negative',
    ok: { label: 'Cerrar sesión', noCaps: true, flat: true },
    cancel: { color: 'primary', noCaps: true, flat: true }
  }).onOk(() => {
    console.log('>>>> Cerrar sesión')
    localStorage.removeItem('token')
    console.log("🚀 localStorage.removeItem('token')", localStorage.getItem('token'))
    state.value.loggedUser = null
    console.log("🚀 state.value.loggedUser = null", state.value.loggedUser)
    $router.replace('/')
    return 'User wants to logout'
  }).onCancel(() => {
    console.log('>>>> Cancel')
    return 'Canceled by user'
  })
}
</script>
<template>
  <q-item
    v-if="state.loggedUser"
    clickable
    v-ripple
    class="text-white q-py-none absolute-right"
    :title="state.loggedUser.usuario + '. ' + state.loggedUser.nombre + '. ' + state.loggedUser.permisos"
  >
    <!--    INFORMACIÓN DEL USUARIO-->
    <q-item-section>
      <q-item-label class="text-yellow-1 text-bold">
        <span class>
          {{ state.loggedUser.nombre }}
          </span>
      </q-item-label>
      <q-item-label class="text-orange-1 text-bold" caption>
        {{ state.loggedUser.rol.replace(/ROLE_/g, '') }}
      </q-item-label>
    </q-item-section>
    <!--    AVATAR-->
    <q-item-section side>
      <q-avatar
        size="xl"
        :color="$q.dark.isActive ? 'amber-8' : 'amber-1'"
        :text-color="$q.dark.isActive ? 'q-yellow-1' : 'primary'"
        class="text-weight-bolder text-uppercase"
      >
        <img
          v-if="state.loggedUser.img"
          :src="state.loggedUser.img"
          :alt="state.loggedUser.nombre.charAt(0)"
        />
        <span
          v-else
        >{{ state.loggedUser.nombre.charAt(0) }}</span>

        <q-badge
          style="backdrop-filter:blur(5px);background:#c826 !important"
          :title="state.loggedUser.rol"
          floating
          rounded
          color="transparent"
          class="text-weight-bold text-yellow-1"
        >{{ state.loggedUser.rol.replace(/[a-z]/g, '').replace(/ROLE_/g, '')[0] }}</q-badge>
      </q-avatar>
    </q-item-section>

    <q-menu fit :offset="[-10, 10]">
      {{state.loggedUser}}
      <div class="column q-pa-md">
        <div class="row items-center">
          <q-btn
            icon="r_logout"
            color="negative"
            label="Cerrar sesión"
            class="full-width"
            no-caps
            flat
            v-close-popup
            @click="logout"
          />
        </div>
        <q-separator inset class="q-ma-md" />
        <div class="column">
          <q-btn flat to="/settings" label="Ajustes"  class="text-weight-light"/>
          <q-toggle v-model="state.dense" label="Interfaz densa" />
          <DarkModeControl />
        </div>



      </div>
    </q-menu>
  </q-item>
</template>
