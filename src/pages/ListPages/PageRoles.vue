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
          v-model.trim="rolObject.rol"
          :dense="state.dense"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
            (val) =>
              (val && /^[A-Za-z_]+$/.test(val)) ||
              'Sólo se admiten letras y guiones bajos (_)',
          ]"
          filled
          label="Nombre del rol"
          lazy-rules
        /><q-select
          label="Permisos"
          :dense="state.dense"
          filled
          v-model="rolObject.permisos"
          :options="permisosArr"
          option-value="id"
          :option-label="(item)=>item.label ? item.label : item.permiso"
          emit-value
          map-options
          multiple
          use-chips
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
          ]"
        />
        <pre class="text-caption" v-if="state.loggedUser.usuario == 'admin'">
Developer info
ROLE_{{ rolObject.rol.toUpperCase() }}
{{ rolObject }}
        </pre>
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
import state, {
  permisosArr,
  rolesArr,
  permisosArrToLabeled,
} from "src/composables/useState.js";
const rolFields = ref([
  {
    name: "rol",
    required: true,
    label: "Nombre",
    align: "left",
    field: "rol",
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
]);
const url = "/rol";

//listar
const listarRoles = () => listar(rolesArr, url);
// execute on component load
listarRoles();
listar(permisosArr, `${url}/mostrarPermisos`);
permisosArrToLabeled(permisosArr.value);

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const rolObject = ref();

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { rol: "", permisos: [] }) => {
  rolObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  rolObject.value.rol = `ROLE_${rolObject.value.rol.toUpperCase()}`; //modificar valor del nombre de rol para encajar con la manera en que se guardan en la base de datos
  guardar(rolObject.value, rolesArr, url);
  resetFormData();
}
//RESET
function resetFormData() {
  rolObject.value = { rol: "", permisos: [] };
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, rolesArr, url);
</script>
