<template>
  <q-page padding class="q-pb-xl">
    <DenunciaForm @close-form="closeForm"/>
    <q-btn size="sm" dense flat icon="refresh" @click="listarDenuncias"/>
    <BaseForm formTitle="Denuncia" v-model="showForm" @close-form="closeForm" @submit="submitFormData">
      <template v-slot:default>
        <!-- Descripción denuncia -->
        <q-input
          clearable
          :dense="state.dense"
          label="Descripción"
          filled
          autogrow/>
      </template>
    </BaseForm>
    <ListPage
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="Denuncias"
      :rows="denunciasArr"
      :columns="denunciaFields"
    ></ListPage>
  </q-page>
</template>
<script setup>
import {ref, provide} from "vue";
import state from 'src/composables/useState.js'
import ListPage from 'components/ListPage.vue'
import DenunciaForm from 'components/forms/DenunciaForm.vue'
import BaseForm from 'components/BaseForm.vue'
import listar, {eliminar, guardar} from 'src/composables/useAPI.js'


const denunciaFields = ref([
  {
    name: 'denunciante',
    required: true,
    label: 'Denunciante',
    align: 'left',
    field: denuncia => `${denuncia.denunciante.nombre} ${denuncia.denunciante.apellidos}`,
    sortable: true
  },
  {
    name: 'involucrados',
    required: true,
    label: 'Estudiantes involucrados',
    align: 'left',
    field: denuncia => `${denuncia.involucrados[0].nombre} ${denuncia.involucrados[0].apellidos}`,
    sortable: true,
  },
  {name: 'indisciplina', required: true, label: 'Indisciplina', align: 'left', field: 'indisciplina', sortable: true,},
  {name: 'fecha', required: true, label: 'Fecha', align: 'left', field: 'fecha', sortable: true,},
  {name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true,},
])

const denunciasArr = ref([{
  denunciante: {nombre: 'Pedro', apellidos: 'Aujares Torres'},
  involucrados: [{nombre: 'Carlos'}],
  indisciplina: 'Mal comportamiento'
}])
provide('denunciasArr', denunciasArr)
const url = '/Denuncia'
provide('denunciaUrl', url)

//listar
const listarDenuncias = () => listar(denunciasArr, url)
provide('listarDenuncias', listarDenuncias)
// execute on component load
listarDenuncias()


//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const denunciaObject = ref({})
provide('denunciaObject', denunciaObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = {}) => {
  denunciaObject.value = obj
  showForm.value = true
  console.log(`openForm triggered. showForm.value is ${showForm.value}`)
}
//SUBMIT
function submitFormData() {
  guardar(denunciaObject.value, denunciasArr, url)
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, denunciasArr, url)

</script>
