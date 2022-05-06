<template>
  <q-dialog persistent position="top">
    <q-card>
      <q-card-section class="text-h7 text-uppercase text-weight-light"
        ><slot name="header">
        {{ props.isModifying ? "Modificar" : "Nueva" }}
        {{ props.formTitle }}
      </slot></q-card-section
      >
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="resetFormFields">
          <slot></slot>
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
const props = defineProps({formTitle:String,isModifying: Boolean})
const emits = defineEmits(["closeForm","submit"]);
const url = inject("denunciaUrl");

//STATE
const denunciasArr = inject("denunciasArr");

const denunciaObject = inject("denunciaObject");

//SUBMIT
function onSubmit() {
  emit("submit")
  resetFormFields();
}

//RESET FORM
function resetFormFields() {
  //Reset fields
  denunciaObject.value = null;
  formulario.value.resetValidation();
}
</script>
