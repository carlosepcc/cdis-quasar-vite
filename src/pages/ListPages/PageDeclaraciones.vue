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
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
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
      rowKey="declaracionPK"
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

 /*Get /declaracion [ {
    "declaracionPK": {
      "usuario": "string",
      "casocomision": 0,
      "casodenuncia": 0
    },
    "abierta": true,
    "fecha": "2022-06-19T06:46:21.565Z",
    "declaracion": "string",
    "expediente": "string",
    "caso": {
      "casoPK": {
        "comision": 0,
        "denuncia": 0
      },
      "abierto": true,
      "fechaapertura": "2022-06-19T06:46:21.565Z",
      "fechaexpiracion": "2022-06-19T06:46:21.565Z",
      "dictamen": "string"
    }
  }] */
const declaracionFields = ref([
  {
    name: "usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (declaracion) => declaracion.declaracionPK.usuario,
    sortable: true,
  },
  {
    name: "caso",
    required: true,
    label: "Caso",
    align: "left",
    field: (declaracion) => declaracion.caso.casoPK.denuncia,
    sortable: true,
  },
  {
    name: "abierta",
    required: true,
    label: "URL de la Declaración",
    align: "left",
    field: "abierta",
    sortable: true,
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "left",
    field: "fecha",
    sortable: true,
  },
  {
    name: "declaracion",
    required: true,
    label: "URL de la Declaración",
    align: "left",
    field: "declaracion",
    sortable: true,
  },
  {
    name: "expediente",
    required: true,
    label: "URL del Expediente",
    align: "left",
    field: "expediente",
    sortable: true,
  },
]);
const declaracionesArr = ref([]);
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
