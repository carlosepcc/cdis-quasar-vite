<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Caso"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
    >
      <template v-slot:default>
        <!-- Nombre caso -->
        <q-input
          v-model.trim="casoObject.nombre"
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
          v-model="casoObject.permisos"
          multiple
          :dense="state.dense"
          :options="permisosArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Permisos"
          lazy-rules
        />

        <q-card v-show="update">
<q-card-section>
 {{ casoObject.declaracionList.length }} usuarios han declarado para este caso:
  <span v-for="declaracionObj in casoObject.declaracionList" :key="declaracionObj.declaracionPK">
    {{ declaracionObj.declaracionPK.usuario }},
  </span>
</q-card-section>
        </q-card>
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
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state,{casosArr} from "src/composables/useState.js";
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
// execute on component load listarCasos();

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const casoObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
  casoObject.value = obj;
  showForm.value = true;
};

const update = ref(casoObject.value.casoPK !== undefined)
//SUBMIT
function submitFormData() {
  guardar(casoObject.value, casosArr, url, update.value);
}
//RESET
function resetFormData() {
  casoObject.value = null;
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, casosArr, url);
</script>
