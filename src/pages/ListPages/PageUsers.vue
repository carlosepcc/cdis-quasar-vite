<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Usuario"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
      :isModifying="true"
    >
      <template v-slot:default>
        <q-select
          v-model="userObject.usuario"
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Usuario"
          lazy-rules
          map-options
          option-label="nombre"
          emit-value
          option-value="usuario"
        />
        <q-select
          v-model="userObject.rol"
          :dense="state.dense"
          :options="rolesArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Rol"
          option-label="rol"
          map-options
          option-value="id"
          lazy-rules
        />
      </template>
<!--
      <DevInfo>
           update: {{update}}
           userObject: {{userObject}}
       </DevInfo>-->
    </BaseForm>
    <ListPage
      :columns="userFields"
      :rows="usersArr"
      heading="Usuarios"
      rowKey="usuario"
      @updateList="listar"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      :canCreate="false"
      :canDelete="false"
    >
      <template v-slot:add-btn>Modificar</template>
    </ListPage>
    <DevInfo>
      {{usersArr}}
    </DevInfo>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import DevInfo from "components/DevInfo.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state, {usersArr,rolesArr} from "src/composables/useState.js";

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
    name: "usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: "usuario",
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
    name: "rol",
    label: "Rol",
    align: "center",
    field: (u) => u.rol.rol,
    sortable: true,
  },
]);
const url = "/usuario";

// execute on component load
listar()
listar(rolesArr,'/rol')

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listar()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const userObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
  userObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(userObject.value, usersArr, url,true);
}
//RESET
function resetFormData() {
  userObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, usersArr, url);
</script>
