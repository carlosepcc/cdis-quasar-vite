<template>
  <q-page class="q-pb-xl" padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      formTitle="Resolucion"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
      :isModifying="update"
    >
      <template v-slot:header v-if="update">VER RESOLUCION</template>
      <template v-slot:footer v-if="update">
        <q-btn flat no-caps
        :size="state.dense ? 'sm' : 'md'"
        label="Cerrar"
        icon="r_close" class="full-width"
        @click="closeForm"
        /></template>
      <template v-slot:default>
        <q-input
          v-model="resolucionObject.ano"
          :borderless="update" :dense="state.dense"
          label="Curso" :readonly="update"
          max-length="4" class="q-mb-md"
        />

<!--        COMISIONES-->
        <q-card v-for="(c,i) in resolucionObject.comisiones" :key="i" flat bordered class="my-card bg-grey-1 q-mb-sm">
          <q-card-section class="q-pa-xs q-pl-sm q-pr-none">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-light">Comisión {{ i + 1 }}</div>
              </div>

              <div class="col-auto" v-if="!update">
                <q-btn color="negative" size="sm" title="Descartar comisión" flat icon="r_close"
                       @click="resolucionObject.comisiones.splice(i,1)"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-select
              :readonly="update"
              v-model="c.presidente"
              :dense="state.dense"
              :options="usersArr"
              :rules="[val || 'Por favor, seleccione un presidente']"
              label="Presidente"
              lazy-rules
              map-options
              option-label="nombre"
              emit-value
              option-value="usuario"
            />
            <q-select
              :readonly="update"
              v-model="c.secretario"
              :dense="state.dense"
              :options="usersArr"
              :rules="[val || 'Por favor, seleccione un secretario']"
              label="Secretario"
              lazy-rules
              map-options
              option-label="nombre"
              emit-value
              option-value="usuario"
            />
          </q-card-section>
        </q-card>

       <q-btn v-show="!update" flat size="xl" color="grey" icon="r_add" spread no-caps class="full-width"
              :label="`Comisión ${ resolucionObject.comisiones.length + 1 }`"
              @click="resolucionObject.comisiones.push({presidente:'',secretario:'',idRolP: 4, idRolS: 5,})"
       />
<DevInfo>
  {{ resolucionObject }}
</DevInfo>
      </template>
    </BaseForm>
    <ListPage
      :columns="resolucionFields"
      :rows="resolucionesArr"
      heading="Resoluciones"
      rowKey="id"
      @updateList="listarResoluciones"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      :canUpdate="false"
    ></ListPage>
    <DevInfo>
resolucionObject: {{resolucionObject}}<br/>
      resolucionesArr: {{resolucionesArr}}
    </DevInfo>
<!--    No hay endpoint en el backend para modificar la resolucion-->
  </q-page>
</template>
<script setup>
import {computed, ref} from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import DevInfo from "components/DevInfo.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state, {
  usersArr,
  permisosArr,
  resolucionesArr,
  pathToCurso,
} from "src/composables/useState.js";

const resolucionFields = ref([
  {
    name: "curso",
    label: "Curso",
    field: "url",
    align: "center",
    format: url => pathToCurso(url),
    sortable: true,
  },
  {
    name: "comisiones",
    required: true,
    label: "Comisiones",
    align: "left",
    field: r => r.comisionList.map(c => c.id),
    sortable: true,
  },
]);
const url = "/resolucion";

//listar
const listarResoluciones = () => listar(resolucionesArr, url);
// execute on component load
listarResoluciones();
listar()//Listar usuarios es el comportamiento por defecto

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarResoluciones();
};
// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const resolucionObject = ref({});
const resolucionRowObject = ref({})
const resolucionExportObject = ref({})

const update = computed(()=> resolucionObject.value.id !== undefined)
//openForm triggered on: Nueva entrada, Modificar
const currentYear = new Date().getFullYear()
const curso = `${currentYear}-${currentYear+1}`
const openForm = (obj = { ano : curso, comisiones:[{
    "idRolP": 4,
    "idRolS": 5,}]}) => {
  resolucionRowObject.value = obj
  resolucionObject.value = obj;
  let resolucionDto = {}
  if (obj.id !== undefined){
    resolucionDto.id = obj.id
    resolucionDto.ano = pathToCurso(obj.url)
    resolucionDto.comisiones = obj.comisionList.map(c => {
      return {
      presidente: c.comisionUsuarioList[0]?.usuario?.usuario,
      secretario: c.comisionUsuarioList[1]?.usuario?.usuario
      }
    })
    resolucionObject.value = resolucionDto;
  }
  showForm.value = true;
};

//SUBMIT
function submitFormData() {
  guardar(resolucionObject.value, resolucionesArr, url);
  resetFormData();
  closeForm()
}
//RESET
function resetFormData() {
  resolucionObject.value = { ano : curso, comisiones:[{}]};
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, resolucionesArr, url);
</script>
