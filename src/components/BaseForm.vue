<template>
  <q-dialog persistent position="top">
    <q-card>
      <q-card-section
        class="row items-center q-py-xs text-h7 text-uppercase text-weight-light"
      >
        <slot name="header">
          {{ props.isModifying ? "Modificar" : "Crear" }}
          {{ props.formTitle }}
        </slot>
        <q-space />
        <q-btn
          icon="close"
          :size="state.dense ? 'sm' : 'md'"
          flat
          round
          title="Cerrar recuadro"
          @click="$emit('closeForm')"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="resetFormFields">
          <slot></slot>
          <q-btn-group push spread>
            <q-btn
              push
              type="reset"
              :size="state.dense ? 'sm' : 'md'"
              label="Limpiar"
              icon="r_backspace"
              no-caps
            />
            <q-btn
              push
              type="submit"
              :size="state.dense ? 'sm' : 'md'"
              color="primary"
              label="Guardar"
              no-caps
              icon="r_save"
            />
          </q-btn-group>
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
const props = defineProps({ formTitle: String, isModifying: Boolean });
const emit = defineEmits(["closeForm", "submit", "reset"]);
const url = inject("denunciaUrl");

//SUBMIT
function onSubmit() {
  emit("submit");
  resetFormFields();
}

//RESET FORM
function resetFormFields() {
  //Reset fields
  emit("reset");
  formulario.value.resetValidation();
}
</script>
