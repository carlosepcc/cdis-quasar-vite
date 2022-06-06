<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Declaracion"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <!-- Nombre declaracion -->
        <q-input
          v-model.trim="declaracionObject.nombre"
          :dense="state.dense"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, escriba algo',
          ]"
          clearable
          filled
          label="Nombre"
          lazy-rules
        />
        <q-select
          v-model="declaracionObject.permisos"
          multiple
          :dense="state.dense"
          :options="permisosArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Permisos"
          lazy-rules
        />
      </template>
    </BaseForm>
    <ListPage
      :columns="declaracionFields"
      :rows="declaracionesArr"
      heading="Declaraciones"
      rowKey="id"
      @updateList="listarDeclaraciones"
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
const declaracionFields = ref([
  {
    name: "usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: "usuario",
    sortable: true,
  },
  {
    name: "descripcion",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
]);
const declaracionesArr = ref([]);
const permisosArr = ref(["DECLARACIONE_MOD"]);
const url = "/declaracion";

//listar
const listarDeclaraciones = () => listar(declaracionesArr, url);
// execute on component load listarDeclaraciones();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const declaracionObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { permisos: permisosArr.value[0] }) => {
  declaracionObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(declaracionObject.value, declaracionesArr, url);
}
//RESET
function resetFormData() {
  declaracionObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, declaracionesArr, url);
</script>
