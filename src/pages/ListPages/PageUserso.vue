<template>
  <q-page padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="user"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <q-select
          v-model="userObject.permisos"
          :dense="state.dense"
          :options="permisos"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          multiple
          label="Permisos"
          lazy-rules
        />
        <!-- Descripción user -->
        <q-input
          v-model.trim="userObject.descripcion"
          :dense="state.dense"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, escriba algo',
          ]"
          autogrow
          clearable
          filled
          label="Descripción"
          lazy-rules
        />
      </template>
    </BaseForm>
    <ListPage
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="Usuarios"
      :rows="usersArr"
      :columns="userFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import ListPage from "components/ListPage.vue";
import { ref } from "vue";
import listar, { eliminar } from "src/composables/useAPI.js";
import { usersArr } from "src/composables/useState.js";
import BaseForm from "components/forms/BaseForm.vue";

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
    label: "Nombre de usuario",
    align: "left",
    field: "usuario",
    sortable: true,
  },
  {
    name: "cargo",
    required: true,
    label: "Cargo",
    align: "center",
    field: (user) => user.cargo,
    sortable: true,
  },
]);

//listar
const listarUsers = () => listar(usersArr);
// execute on component load listarUsers()

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const userObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (
  obj = {
    usuario: "mai",
    permisos: ["ROLE_MODD"],
  }
) => {
  userObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(denunciaObject.value, denunciasArr, `${url}/crear`);
}
//RESET
function resetFormData() {
  denunciaObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, usersArr);
</script>
