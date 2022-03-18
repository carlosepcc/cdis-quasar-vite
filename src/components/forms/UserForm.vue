<template>
  <q-dialog position="top" persistent>
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ userObject.id ? 'Modificar' : 'Nuevo' }} Usuario
        <q-btn color="grey" flat icon="close" @click="$emit('closeForm')"/>
      </q-card-section>
      <q-separator/>
      {{userObject}}
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <!--  Example Value
   Schema
{
  "username": "string",
  "apellidos": "string",
  "pass": "string",
  "roles": [
    "Administrador"
  ],+
  "nombre": "string"
          }-->
          <div>
            <q-input
              clearable
              autofocus
              :dense="state.dense"
              filled
              v-model.trim="userObject.nombre"
              label="Nombre"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
                (val) => (val && /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(val)) || 'Por favor, sólo letras'
              ]"
            />

            <q-input
              clearable
              :dense="state.dense"
              label="Apellidos"
              v-model.trim="userObject.apellidos"
              filled
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
                (val) => (val && /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(val)) || 'Por favor, sólo letras'
              ]"
            />
            <q-input
              clearable
              :dense="state.dense"
              label="Nombre de usuario"
              v-model="userObject.usuario"
              filled
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
                (val) => (val && val.length < 32) || 'Por favor, no más de 32 caracteres',
                (val) => (val && /^[a-z]+$/.test(val)) || 'Por favor, sólo caracteres de a-z',
              ]"
            />

            <q-input
              clearable
              :dense="state.dense"
              label="Contraseña"
              v-model="userObject.contrasena"
              type="password"
              filled
              lazy-rules
              :rules="!userObject.id ? [
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ] : false"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'r_visibility_off' : 'r_visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
            <q-input
              clearable
              :dense="state.dense"
              label="Repita su contraseña"
              v-model="passCheck"
              type="password"
              filled
              lazy-rules
              :rules="userObject.id ? false : [
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
                (val) => (val === userObject.contrasena) || 'Las contraseñas no coinciden',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'r_visibility_off' : 'r_visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
            <br/>
            <q-select
              v-model="userObject.roles"
              emit-value
              map-options
              :options="rolesArr"
              filled
              :dense="state.dense"
              :options-dense="state.dense"
              label="Rol"
            />
            <!-- !TODO coge todo el objeto y no el valor -->
          </div>
          <q-separator class="q-mb-sm q-mt-md"/>

          <div class="q-gutter-sm">
            <q-btn-group outline spread clas="full-width q-mt-md">
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Limpiar"
                type="reset"
                flat
                no-caps
              />
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Cancelar"
                flat
                no-caps
                @click="$emit('closeForm')"
              />
            </q-btn-group>
            <q-btn
              push
              no-caps
              :size="state.dense ? 'sm' : 'md'"
              class="full-width"
              icon="r_save"
              label="Guardar"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {ref, inject} from 'vue';
import {guardar} from "src/composables/useAPI.js";
import state, {usersArr} from "src/composables/useState.js"

//DOM
const formulario = ref()
const showPassword = ref(false)
const passCheck = ref('')

//COMPONENT
const emits = defineEmits(['closeForm'])


//STATE
const userObject = inject('userObject')
const temp = ref()
const rolesArr = [
  {label: 'Administrador', value: ['ROLE_ADMIN']},
  {label: 'Decano', value: ['ROLE_DECANO']},
  {label: 'Profesor', value: ['ROLE_PROFESOR']},
  {label: 'Estudiante', value: ['ROLE_ESTUDIANTE']}]


//SUBMIT
const onSubmit = () => {
  guardar(userObject.value, usersArr, '/Usuario/crearUsuario')
  onReset();
  // TODO: No resetear cuando guardar da error.
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  userObject.value = {id: userObject.value.id, roles: ["ROLE_ESTUDIANTE"]}
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
