<template>
  <q-page padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Caso"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <q-select
          v-model="casoObject.idDenuncia"
          :dense="state.dense" :options="denunciasArr"
          :rules="[val || 'Por favor, seleccione una denuncia']"
          filled lazy-rules map-options emit-value
          label="Denuncia" behavior="dialog"
          :option-label="d=>d.descripcion.slice(0,50)+'(...)'"
          option-value="id"
        />
        <q-select
          v-model="casoObject.idComision"
          :dense="state.dense" :options="comisionesArr"
          :rules="[val || 'Por favor, seleccione una comisión']"
          filled lazy-rules map-options emit-value
          label="Comisión"
          :option-label="c => c.comisionUsuarioList[0].usuario.nombre"
          option-value="id"
        />
        <!--TODO <q-date/>-->

        <DevInfo>
          {{casoObject}}
          d: {{d}} --- expDate: {{expDate}} --- {{current}}
        </DevInfo>
      </template>

    </BaseForm>
    <ListPage
      :columns="casoFields"
      :rows="casosArr"
      heading="Casos"
      rowKey="id"
      @updateList="listarCasos"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
    ></ListPage>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import DevInfo from "components/DevInfo.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state,{casosArr,denunciasArr,comisionesArr} from "src/composables/useState.js";
const casoFields = ref([
  {
    name: "denuncia",
    required: true,
    label: "Denuncia",
    field: caso => caso.denuncia1.descripcion.slice(0,30),
    sortable: true,
  },
  {
    name: "fechaapertura",
    required: true,
    label: "Fecha de apertura",
    field: "fechaapertura",
    sortable: true,
  },
  {
    name: "fechaexpiracion",
    required: true,
    label: "Fecha de expiración",
    field: "fechaexpiracion",
    sortable: true,
  },
  {
    name: "abierto",
    required: true,
    label: "Abierto",
    field: (caso) => caso.abierto ? 'Sí' : 'No',
    sortable: true,
  },
]);
const url = "/caso";

//listar
const listarCasos = () => listar(casosArr, url);
// execute on component load
listarCasos();
listar(denunciasArr,'/denuncia')
listar(comisionesArr,'/comision')

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarCasos()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const casoObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {
  "diaExp": expDay,
    "mesExp": expMonth,
    "anoExp": expYear,
}) => {
  casoObject.value = obj;
  showForm.value = true;
};
const d = new Date()
const expDate = d
const expYear = expDate.getFullYear();
const expMonth = expDate.getMonth();
const expDay = expDate.getDay();

const update = ref(casoObject.value.casoPK !== undefined)
//SUBMIT
function submitFormData() {
  guardar(casoObject.value, casosArr, url, update.value);
}
//RESET
function resetFormData() {
  casoObject.value = {
    "diaExp": expDay,
    "mesExp": expMonth,
    "anoExp": expYear,
  }
  ;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, casosArr, url);
</script>
