<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Resolucion"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
      :isModifying="resolucionObject.id"
    >
      <template v-slot:default>
        <q-input v-model="resolucionObject.ano"
                 filled
                 :dense="state.dense"
                 label="Año"
                 max-length="4" class="q-mb-md"/>

<!--        COMISIONES-->
        <q-card v-for="(c,i) in resolucionObject.comisiones" :key="i" flat bordered class="my-card bg-grey-1">
          <q-card-section class="q-pa-xs q-pl-sm q-pr-none">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-light">Comisión {{ i + 1 }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="negative" size="sm" title="Descartar comisión" flat icon="r_close"
                       @click="resolucionObject.comisiones.splice(i,1)"
                />
              </div>
            </div>
          </q-card-section>
<q-separator/>
          <q-card-section>
            <q-select
              v-model="c.presidente"
              :dense="state.dense"
              :options="usersArr"
              :rules="[val || 'Por favor, seleccione un presidente']"
              filled
              label="Presidente"
              lazy-rules
              map-options
              option-label="nombre"
              emit-value
              option-value="usuario"
            />
            <q-select
              v-model="c.secretario"
              :dense="state.dense"
              :options="usersArr"
              :rules="[val || 'Por favor, seleccione un secretario']"
              filled
              label="Secretario"
              lazy-rules
              map-options
              option-label="nombre"
              emit-value
              option-value="usuario"
            />
          </q-card-section>
        </q-card>

       <q-btn flat size="xl" color="grey" icon="r_add" spread no-caps class="full-width"
              :label="`Comisión ${ resolucionObject.comisiones.length + 1 }`"
              @click="resolucionObject.comisiones.push({presidente:'',secretario:''})"
       />
<details v-if="state.loggedUser.usuario == 'admin'">
  <summary>Dev info</summary>
  <pre class="text-caption">
{{ resolucionObject }}
        </pre>
</details>
      </template>
    </BaseForm>
    <ListPage
      :columns="resolucionFields"
      :rows="resolucionesArr"
      heading="Resoluciones"
      rowKey="id"
      @updateList="listarResoluciones"
      @open-form="(payload) => openForm()"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
    ></ListPage>
<!--    No hay endpoint en el backend para modificar la resolucion-->
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state, {
  usersArr,
  permisosArr,
  resolucionesArr,
} from "src/composables/useState.js";

const resolucionFields = ref([
  {
    name: "url",
    required: true,
    label: "URL de la resolución",
    align: "left",
    field: "url",
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
//listar()//Listar usuarios es el comportamiento por defecto

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarResoluciones();
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const resolucionObject = ref({});
const resolucionExportObject = ref({})

//openForm triggered on: Nueva entrada, Modificar
const currentYear = new Date().getFullYear()
const curso = `${currentYear}-${currentYear+1}`
const openForm = (obj = { ano : curso, comisiones:[{}]}) => {
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
  resolucionObject.value = { ano : curso, comisiones:[{}]};
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, resolucionesArr, url);
</script>
