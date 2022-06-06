<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Rol"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <!-- Nombre rol -->
        <q-input
          v-model.trim="rolObject.nombre"
          :dense="state.dense"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, escriba algo',
          ]"
          clearable
          filled
          label="Nombre del rol"
          lazy-rules
        />
        <q-select
          v-model="rolObject.permisos"
          multiple
          :dense="state.dense"
          :options="permisosArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Permisos"
          lazy-rules
        />
        <q-checkbox
          label="Rol para comisión"
          v-model="rolObject.rolParaComision"
        />
      </template>
    </BaseForm>
    <ListPage
      :columns="rolFields"
      :rows="rolesArr"
      heading="Roles"
      rowKey="id"
      @updateList="listarRoles"
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
const rolFields = ref([
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "permisos",
    required: true,
    label: "Permisos",
    align: "left",
    field: "permisos",
    sortable: true,
  },
  {
    name: "rolParaComision",
    required: true,
    label: "Rol de comisión",
    align: "left",
    field: "rolParaComision",
    sortable: true,
  },
]);
const rolesArr = ref([]);
const permisosArr = ref(["ROLE_MOD"]);
const url = "/rol";

//listar
const listarRoles = () => listar(rolesArr, url);
// execute on component load listarRoles();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const rolObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (
  obj = { permisos: permisosArr.value[0], rolParaComision: false }
) => {
  rolObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(rolObject.value, rolesArr, url);
}
//RESET
function resetFormData() {
  rolObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, rolesArr, url);
</script>
