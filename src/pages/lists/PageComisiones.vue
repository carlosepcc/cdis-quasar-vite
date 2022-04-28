<template>
  <q-page padding>
    <ComisionForm v-model="showForm" @close-form="closeForm" />

    <q-btn size="sm" dense flat icon="refresh" @click="listarComisiones" />
    <ListPage
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="comisions de reunión"
      :rows="comisionesArr"
      :columns="comisionFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref, provide } from "vue";
import ListPage from 'components/ListPage.vue'
import listar, { listarUsersByRole, eliminar } from 'src/composables/useAPI.js'
import ComisionForm from "src/components/forms/ComisionForm.vue";
import { usersByRole } from 'src/composables/useState.js'

const comisionFields = ref([
  { name: 'jefe', required: true, label: 'Revisor', align: 'left', field: comision => `${comision.revisor.nombre} ${comision.revisor.apellidos}`, sortable: true },
  { name: 'profesor', required: true, label: 'Encargado', align: 'left', field: comision => `${comision.encargado.nombre} ${comision.encargado.apellidos}`, sortable: true }
])

const comisionesArr = ref([{ id: 1, proyecto: 'Proyecto c', revisor: { nombre: 'Adalberto', apellidos: 'Elrevi Sor' }, encargado: { nombre: 'Adalberto', apellidos: 'Elen Cargado' }, descripcion: 'prueba para usarlo mientras no tengo acceso a los datos por seguridad' }])
provide('comisionesArr', comisionesArr)
const url = '/comisiones'
provide('comisionUrl', url)

//listar
const listarComisiones = () => listar(comisionesArr, url)
provide('listarComisiones', listarComisiones)
// execute on component load
listarComisiones()



//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const comisionObject = ref()
provide('comisionObject', comisionObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { revisor: usersByRole.value.Revisor[0], encargado: usersByRole.value.Encargado_de_proyecto[0] }) => {
  comisionObject.value = obj
  showForm.value = true
  listarUsersByRole()
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, comisionesArr, url)

</script>
