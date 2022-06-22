<template>
  <q-page padding>
    <BaseForm
      v-model="showForm"
      v-show="showForm"
      :formTitle="`Denuncia ${denunciaObject.idDenuncia ? denunciaObject.idDenuncia : ''}`"
      @submit="submitFormData"
      @reset="resetFormData"
      @close-form="closeForm"
      :isModifying="update"
    >
      <template v-slot:default>
        <q-select
          v-model="denunciaObject.acusados"
          multiple
          :dense="state.dense"
          :options="usersArr"
          :rules="[val || 'Por favor, seleccione algo']"
          filled
          label="Estudiantes implicados"
          use-chips
          lazy-rules
          map-options
          option-label="nombre"
          emit-value
          option-value="usuario"
          behavior="dialog"
        />
        <!-- Descripción denuncia -->
        <q-input
          v-model.trim="denunciaObject.descripcion"
          :dense="state.dense"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Este campo no puede estar vacío',
          ]"
          autogrow
          clearable
          filled
          label="Descripción"
          lazy-rules
        />
        <pre  class="text-caption" v-if="state.loggedUser.usuario == 'admin'">
Developer info
{{ denunciaObject }}
        </pre>
      </template>
    </BaseForm>
    <ListPage
      :columns="denunciaFields"
      :rows="denunciasArr"
      heading="Denuncias"
      rowKey="id"
      @updateList="listarDenuncias"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
    ></ListPage>
  </q-page>
</template>
<script setup>
import { ref,computed } from "vue";
import ListPage from "components/ListPage.vue";
import BaseForm from "components/BaseForm.vue";
import listar, { eliminar, guardar } from "src/composables/useAPI.js";
import state, { usersArr, denunciasArr } from "src/composables/useState.js";

const denunciaFields = ref([
 /* {name: "acusados",    required: true,    label: "Estudiantes implicados",    align: "left",    field: "acusados",    sortable: true,},*/
  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "left",
    field: "fecha",
    sortable: true,
  },{
    name: "descripcion",
    required: true,
    label: "Descripción",
    align: "left",
    field: "descripcion",
    sortable: true,
  },{
    name: "denunciante",
    required: true,
    label: "Denunciante",
    align: "left",
    field: "denunciante",
    sortable: true,
  },{
    name: "procesada",
    required: true,
    label: "Procesada",
    align: "left",
    field: "procesada",
    sortable: true,
    format: procesada => procesada ? "Sí" : "No",
  },
]);

const url = "/denuncia";

//listar
const listarDenuncias = () => listar(denunciasArr, url);
// execute on component load
listarDenuncias();
listar()

//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false;
  listarDenuncias()
};

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const denunciaObject = ref({});
const denunciaRowObject = ref({})

const update = computed(()=> denunciaObject.value.idDenuncia !== undefined)
//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore" }) => {
 denunciaRowObject.value = obj
  denunciaObject.value = obj
  let denunciaDto = {}
  if (obj.id !== undefined){
    denunciaDto.idDenuncia = obj.id
    denunciaDto.descripcion = obj.descripcion
    denunciaDto.acusados = obj.acusados.map(acusado => acusado.usuario)
    denunciaObject.value = denunciaDto;
 }
  showForm.value = true;
};


//SUBMIT
function submitFormData() {
  guardar(denunciaObject.value, denunciasArr, url, update.value);
  closeForm()
}
//RESET
function resetFormData() {
  denunciaObject.value = {descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"};
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) =>
  eliminar(selectedRows, denunciasArr, url);
</script>
