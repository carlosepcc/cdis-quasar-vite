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
        <q-card v-for="(c,index) in comisiones" flat bordered class="my-card bg-grey-1">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-light">Comisión {{ index+1 }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>Remove Card</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Send Feedback</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Share</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ lorem }}
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>

        <q-select
          v-model="resolucionObject.comisiones"
          multiple
          :dense="state.dense"
          :options="comisionesArr"
          :rules="[val || 'Por favor, seleccione las comisiones']"
          filled
          label="Comisiones"
          behavior="dialog"
          map-options
          option-label="id"
          lazy-rules
        >
          <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No hay opciones
            </q-item-section>
          </q-item>
        </template></q-select>

        <!--<q-uploader
          label="Upload"
          :factory="factoryFn"
          style="max-width: 300px"
        />-->
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
  permisosArr,
  resolucionesArr,
} from "src/composables/useState.js";

const comisiones = ref([{}])
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
const factoryFn = (file) => {
  console.log(file);
  let FormData = require('form-data');
  let fs = require('fs');
  let data = new FormData();
  data.append('file', fs.createReadStream(file));
  data.append('JSONR', '{"ano":"2052"}', {contentType: 'application/json'});

}
//listar
const listarResoluciones = () => listar(resolucionesArr, url);
// execute on component load
listarResoluciones();

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
const currentYear = new Date().getFullYear().toString()
const openForm = (obj = { ano : currentYear}) => {
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
  resolucionObject.value = { ano : currentYear};
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, resolucionesArr, url);
</script>
