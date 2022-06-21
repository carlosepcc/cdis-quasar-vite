<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Usuario"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <q-select
          v-model="userObject.username"
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Usuario"
          lazy-rules
          map-options
          option-label="nombre"
          emit-value
          option-value="username"
        />
        <q-select
          v-model="userObject.permisos"
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Permisos"
          lazy-rules
        />
      </template>
    </BaseForm>
    <ListPage
      :columns="userFields"
      :rows="usersArr"
      heading="Usuarios"
      rowKey="username"
      @updateList="listarUsers"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
    ></ListPage>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state from "src/composables/useState.js";

import { usersArr } from "src/composables/useState.js";

const userFields = ref([
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "username",
    required: true,
    label: "Usuario",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "cargo",
    required: true,
    label: "Cargo",
    align: "center",
    field: "cargo",
    sortable: true,
  },
  {
    name: "permisos",
    required: true,
    label: "Permisos",
    align: "center",
    field: "permisos",
    sortable: true,
  },
]);
const url = "/user";

//listar
const listarUsers = () => listar(usersArr, url);
// execute on component load listarUsers();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarUsers()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const userObject = ref({});
con
//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj) => {
  userObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(userObject.value, usersArr, `${url}/crear`);
}
//RESET
function resetFormData() {
  userObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, usersArr, url);
</script>
