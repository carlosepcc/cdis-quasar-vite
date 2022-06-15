<template>
  <q-dialog persistent position="top">
    <q-card>
      <q-card-section class="text-h7 text-uppercase text-weight-light"
        >{{
          denunciaObject.id ? "Modificar" : "Nueva"
        }}
        Denuncia</q-card-section
      >
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <!--          Indisciplina-->
          <q-input
            clearable
            :dense="state.dense"
            filled
            v-model.trim="denunciaObject.indisciplina"
            label="Indisciplina"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]"
          />

          <q-select
            model-value="denunciaObject.estudiantes"
            multiple
            :options="state.usersArr"
          />
          <q-select
            :dense="state.dense"
            v-model="denunciaObject.estudiantes"
            filled
            :options="state.usersArr"
            map-options
            option-label="nombre"
            label="Estudiantes"
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
              (val) =>
                (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]"
          />
          <q-separator class="q-mb-sm q-mt-md" />

          <div class="q-gutter-sm">
            <q-btn-group outline spread clas="full-width q-mt-md">
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Restablecer"
                type="reset"
                flat
                color="negative"
              />
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Cancelar"
                flat
                @click="$emit('closeForm')"
              />
            </q-btn-group>
            <q-btn
              push
              :size="state.dense ? 'sm' : 'md'"
              class="full-width"
              icon="r_save"
              label="Guardar"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, inject } from "vue";
import { guardar } from "src/composables/useAPI.js";
import state from "src/composables/useState.js";

//DOM
const formulario = ref();

//COMPONENT
const emits = defineEmits(["closeForm"]);
const url = inject("denunciaUrl");

//STATE
const denunciasArr = inject("denunciasArr");

const denunciaObject = inject("denunciaObject");

//SUBMIT
function onSubmit() {
  guardar(denunciaObject.value, denunciasArr, url);
  onReset();
}

//RESET FORM
function onReset() {
  //Reset fields
  denunciaObject.value = null;
  formulario.value.resetValidation();
}
</script>
