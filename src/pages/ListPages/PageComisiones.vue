<template>
  <q-page class="" padding>
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
          v-model="comisionObject.idResolucion"
          :dense="state.dense"
          :options="resolucionesArr"
          :rules="[val || 'Por favor, seleccione una resolución']"
          filled
          label="Resolución"
          lazy-rules
          map-options
          option-label="descripcion"
          emit-value
          option-value="id"
        > <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No hay opciones
            </q-item-section>
          </q-item>
        </template></q-select>
        <q-select
          v-model="comisionObject.integrantesComision[0].usuario"
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione un presidente']"
          filled
          label="Presidente"
          lazy-rules
          map-options
          option-label="nombre"
          emit-value
          option-value="username"
        />
        <q-select
        v-model="comisionObject.integrantesComision[1].usuario"
        :dense="state.dense"
        :options="usersArr"
        :rules="[val || 'Por favor, seleccione un secretario']"
        filled
        label="Secretario"
        lazy-rules
        map-options
        option-label="nombre"
        emit-value
        option-value="username"
      />

        <pre v-if="state.loggedUser.usuario == 'admin'">
          Developer info
          {{comisionObject}}
        </pre>
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
    <DevInfo>
      comisinObject: {{comisionObject}}
      comisionesArr: {{comisionesArr}}
    </DevInfo>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import DevInfo from "components/DevInfo.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state, { usersArr,comisionesArr,resolucionesArr,pathToCurso } from "src/composables/useState.js";

const comisionFields = ref([
  {
    name: "resolucion",
    required: true,
    label: "Resolución",
    align: "left",
    field: c => pathToCurso(c.resolucion.url),
    sortable: true,
  },
  {
    name: "presidente",
    required: true,
    label: "Presidente",
    align: "left",
    field: c => c.comisionUsuarioList.length > 0 ? c.comisionUsuarioList[0].usuario.nombre : 'Sin usuarios',
    sortable: true,
  },
  {
    name: "secretario",
    required: true,
    label: "Secretario",
    align: "left",
    field: c => c.comisionUsuarioList.length > 1 ? c.comisionUsuarioList[1].usuario.nombre : 'Sin secretario',
    sortable: true,
  },{
    name: "caso",
    required: true,
    label: "Último caso",
    align: "left",
    field: c => c.casoList.length > 0 ? c.casoList[casoList.length-1].casoPK.denuncia : 'Sin casos asignados',
    sortable: true,
  },
]);

const url = "/comision";

//listar
const listarComisiones = () => listar(comisionesArr, url);
const listarResoluciones = () => listar(resolucionesArr, '/resolucion')
// execute on component load
listarComisiones()
listarResoluciones()

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarComisiones()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const comisionObject = ref({});

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {integrantesComision:[{idRol:11},{idRol:5}]}) => {
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
