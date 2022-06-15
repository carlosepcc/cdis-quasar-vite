<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Denuncia"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <q-select
          v-model="denunciaObject.acusado"
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
        <!-- Descripción denuncia -->
        <q-input
          v-model.trim="denunciaObject.descripcion"
          :dense="state.dense"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
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
      :columns="denunciaFields"
      :rows="denunciasArr"
      heading="Denuncias"
      rowKey="id"
      @updateList="listarDenuncias"
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

const denunciaFields = ref([
  {
    name: "denunciante",
    required: true,
    label: "Denunciante",
    align: "left",
    field: (denuncia) => denuncia.denunciaUsuarioList[0].denunciante,
    sortable: true,
  },
  {
    name: "acusado",
    required: true,
    label: "Estudiantes implicados",
    align: "left",
    field: "acusado",
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
    name: "descripcion",
    required: true,
    label: "Descripción",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
]);
const denunciasArr = ref([
  {
    id: 1,
    acusado: "admin",
    fecha: "2022-05-07",
    descripcion:
      "Un grupo de estudiantes ingresó al aula inteligente y lorem ipsum dolor sit amet consectectur adspisicting",
    procesada: false,
    denunciaUsuarioList: [{ denunciante: "admin" }],
    casoList: [],
  },
]);
const url = "/denuncia";

//listar
const listarDenuncias = () => listar(denunciasArr, url);
// execute on component load listarDenuncias();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const denunciaObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { acusado: "admin", descripcion: "Sucedio que" }) => {
  denunciaObject.value = obj;
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(denunciaObject.value, denunciasArr, url);
}
//RESET
function resetFormData() {
  denunciaObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, denunciasArr, url);
</script>
