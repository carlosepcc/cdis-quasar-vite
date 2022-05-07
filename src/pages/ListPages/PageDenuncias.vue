<template>
  <q-page padding class="q-pb-xl">
   <BaseForm formTitle="Denuncia" v-model="showForm" @close-form="closeForm" @submit="submitFormData">
      <template v-slot:default>
        <!--          Indisciplina-->
        <q-input
          clearable
          :dense="state.dense"
          filled
          v-model.trim="denunciaObject.indisciplina"
          label="Indisciplina"
          lazy-rules
          :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
        />

        <q-select
          :dense="state.dense"
          v-model="denunciaObject.estudiantes"
          filled
          :options="usersArr"
          map-options
          option-label="nombre"
          label="Estudiantes involucrados"
          lazy-rules
          :rules="[val || 'Por favor, seleccione algo']"
        />
        <!-- Descripción denuncia -->
        <q-input
          clearable
          :dense="state.dense"
          label="Descripción"
          v-model.trim="denunciaObject.descripcion"
          filled
          autogrow
          lazy-rules
          :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
        />
      </template>
    </BaseForm>
    <ListPage
      @updateList="listarDenuncias"
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
import {usersArr} from 'src/composables/useState.js'
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
  indisciplina: 'Mal comportamiento',
  fecha:'2022-05-07',
  descripcion:'Un grupo de estudiantes ingresó al aula inteligente y lorem ipsum dolor sit amet consectectur adspisicting'
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
