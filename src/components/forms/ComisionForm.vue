<template>
  <q-dialog persistent position="top">
    <q-card>
      <q-card-section class="text-h7 text-uppercase text-weight-light"
        >{{ comisiónObject.id ? "Modificar" : "Nuevo" }} Comisión
        Disciplinaria</q-card-section
      >
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <q-input
            clearable
            autofocus
            :dense="state.dense"
            filled
            v-model.trim="comisionObject.productoAf"
            label="Producto Afectado"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]"
          />
          <q-input
            clearable
            :dense="state.dense"
            v-model.trim="comisionObject.ubicacion"
            label="Ubicación"
            filled
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]"
          />
          <q-input
            clearable
            :dense="state.dense"
            label="Descripción"
            v-model.trim="comisionObject.descripcion"
            filled
            autogrow
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]"
          />

          <q-select
            :dense="state.dense"
            v-model="comisionObject.tipo"
            filled
            :options="['No conformidad', 'Oportunidad de mejora']"
            label="Tipo"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-select
            :dense="state.dense"
            v-model="comisionObject.impacto"
            filled
            :options="['bajo', 'medio', 'alto']"
            label="Impacto"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
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
import { guardar } from "src/composables/useAPI";
import state from "src/composables/useState";

//DOM
const formulario = ref();

//COMPONENT
const emits = defineEmits(["closeForm"]);
const url = inject("comisionUrl");

//STATE
const denunciasArr = inject("comisionesArr");

const comisionObject = inject("comisionObject");

//SUBMIT
function onSubmit() {
  guardar(comisionObject.value, comisionesArr, url);
  onReset();
}

//RESET FORM
function onReset() {
  //Reset fields
  comisionObject.value = null;
  formulario.value.resetValidation();
}
</script>
