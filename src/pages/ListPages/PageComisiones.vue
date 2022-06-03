<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="comision"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <q-select
          v-model="comisionObject.acusado"
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Estudiantes involucrados"
          lazy-rules
          map-options
          option-label="nombre"
          emit-value
          option-value="username"
        />
        <!-- Descripción comision -->
        <q-input
          v-model.trim="comisionObject.descripcion"
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
      :columns="comisionFields"
      :rows="comisionesArr"
      heading="comisiones"
      rowKey="id"
      @updateList="listarComisiones"
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
import state, { usersArr } from "src/composables/useState.js";

/* {
  "idResolucion": 0,
  "integrantesComision": [
    {
      "idIntegrante": 0,
      "idRol": 0
    }
  ]
} */
const comisionFields = ref([
  {
    name: "resolucion",
    required: true,
    label: "Resolucion",
    align: "left",
    field: (comision) => comision.idResolucion,
    sortable: true,
  },
  {
    name: "jefe",
    required: true,
    label: "Jefe",
    align: "left",
    field: (comision) => comision.integrantesComision[0].nombre,
    sortable: true,
  },
  {
    name: "secretario",
    required: true,
    label: "Secretario",
    align: "left",
    field: (comision) => comision.integrantesComision[0].nombre,
    sortable: true,
  },
]);
const comisionesArr = ref([
  {
    id: 1,
    idResolucion: 2022,
    jefe: "admin",
    secretario: "admin",
    fecha: "2022-05-07",
    procesada: false,
  },
]);
const url = "/comision";

//listar
const listarComisiones = () => listar(comisionesArr, url);
// execute on component load listarComisiones();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const comisionObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
  comisionObject.value = obj;
  showForm.value = true;
  console.log(`openForm triggered. showForm.value is ${showForm.value}`);
};

//SUBMIT
function submitFormData() {
  guardar(comisionObject.value, comisionesArr, url);
}
//RESET
function resetFormData() {
  comisionObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, comisionesArr, url);
</script>
