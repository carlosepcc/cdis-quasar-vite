<template>
  <q-page padding>
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
        <q-select
          v-model="declaracionObject.idDenuncia"
          :dense="state.dense" :options="denunciasArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled lazy-rules map-options emit-value
          label="Caso disciplinario" behavior="dialog"
          :option-label="d=>d.descripcion.slice(0,50)+'(...)'"
          option-value="id"
        />
        <q-select
          v-model="declaracionObject.usuario"
          :options="usersArr" :dense="state.dense"
          :rules="[val || 'Por favor, seleccione un usuario']"
          label="Usuario a declarar"
          lazy-rules filled map-options emit-value
          option-label="nombre" option-value="usuario"
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
import state,{denunciasArr, usersArr} from "src/composables/useState.js";

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
    field: declaracion => declaracion.id?.usuario,
    sortable: true,
  },
  {
    name: "caso",
    required: true,
    label: "Caso",
    align: "left",
    field: (declaracion) => declaracion.caso?.casoPK?.denuncia,
    sortable: true,
  },
  {
    name: "abierta",
    required: true,
    label: "Abierta",
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
    label: "URL de la Declaración",
    align: "left",
    field: "declaracion",
    sortable: true,
  },
  {
    name: "expediente",
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
// execute on component load
listarDeclaraciones();
listar()
listar(denunciasArr,'/denuncia')

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarDeclaraciones()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const declaracionObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
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
