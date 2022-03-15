<template>
  <q-page padding>
    <UserForm v-model="showForm" @close-form="closeForm" />

    <q-btn size="sm" dense flat icon="refresh" @click="listarUsers" />
    <ListPage
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="Usuarios"
      :rows="usersArr"
      :columns="userFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import ListPage from 'components/ListPage.vue'
import { ref, provide } from "vue";
import listar, { eliminar } from 'src/composables/useAPI.js'
import { usersArr } from 'src/composables/useState.js'
import UserForm from 'components/forms/UserForm.vue'

const userFields = ref([
  { name: 'nombre', required: true, label: 'Nombres', align: 'left', field: 'nombre', sortable: true, },
  { name: 'apellidos', required: true, label: 'Apellidos', align: 'left', field: 'apellidos', sortable: true, },
  { name: 'username', required: true, label: 'Nombre de usuario', align: 'left', field: 'username', sortable: true, },
  { name: 'roles', required: true, label: 'Rol', align: 'center', field: user => user.roles[0], sortable: true, }])




//listar
const listarUsers = () => listar(usersArr)
provide('listarUsers', listarUsers)
// execute on component load
listarUsers()


//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const userObject = ref()
provide('userObject', userObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { roles: ["Administrador"] }) => {
  userObject.value = obj
  showForm.value = true
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, usersArr)

</script>
