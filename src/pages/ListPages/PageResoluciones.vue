<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Resolucion"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <!-- Nombre resolucion -->
        <q-input
          v-model.trim="resolucionObject.descripcion"
          :dense="state.dense"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
          ]"
          filled
          autogrow
          label="Descripción"
          lazy-rules
        />
        <pre class="text-caption" v-if="state.loggedUser.usuario == 'admin'">
Developer info

{{ resolucionObject }}
        </pre>
      </template>
    </BaseForm>
    <ListPage
      :columns="resolucionFields"
      :rows="resolucionesArr"
      heading="Resoluciones"
      rowKey="id"
      @updateList="listarResoluciones"
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
  resolucionesArr,
} from "src/composables/useState.js";
const resolucionFields = ref([
  {
    name: "descripcion",
    required: true,
    label: "Descripción",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "comisiones",
    required: true,
    label: "Comisiones",
    align: "left",
    field: "comisionList",
    sortable: true,
  },
]);
const url = "/resolucion";

//listar
const listarResoluciones = () => listar(resolucionesArr, url);
// execute on component load
listarResoluciones();
listar(permisosArr, `${url}/mostrarPermisos`);//Actualizar el listado de permisos

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const resolucionObject = ref();

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
  resolucionObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(resolucionObject.value, resolucionesArr, url);
  resetFormData();
}
//RESET
function resetFormData() {
  resolucionObject.value = {};
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, resolucionesArr, url);
</script>
