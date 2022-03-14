<template>
  <q-dialog position="top" persistent>
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ artefactoObject.id ? 'Modificar' : 'Nuevo' }} Artefacto
        <q-btn color="grey" flat icon="close" @click="$emit('closeForm')" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <div>
            <q-input
              clearable
              autofocus
              :dense="state.dense"
              filled
              v-model.trim="artefactoObject.nombre"
              label="Nombre del artefacto"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-select
              :dense="state.dense"
              v-model="artefactoObject.fase"
              default
              filled
              :options="['Inicio', 'Ejecución', 'Cierre']"
              label="Fase"
            />

            <q-select
              :dense="state.dense"
              v-model="artefactoObject.disciplina"
              filled
              :options="['Modelado del negocio', 'Requisitos', 'Análisis y diseño', 'Implementación', 'Pruebas', 'Despliegue']"
              label="Disciplina"
            />
            <q-input
              clearable
              :dense="state.dense"
              label="Descripción"
              v-model.trim="artefactoObject.descripcion"
              filled
              autogrow
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />
          </div>
          <q-separator class="q-mb-sm q-mt-md" />

          <div class="q-gutter-sm">
            <q-btn-group outline spread clas="full-width q-mt-md">
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Restablecer"
                type="reset"
                flat
                no-caps
              />
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Cancelar"
                flat
                no-caps
                @click="$emit('closeForm')"
              />
            </q-btn-group>
            <q-btn
              push
              no-caps
              :size="state.dense ? 'sm' : 'md'"
              class="full-width"
              icon="r_save"
              :label="artefactoObject.id ? 'Modificar' : 'Guardar'"
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
import { ref, inject } from 'vue';
import { guardar } from "src/composables/useAPI";
import state from "src/composables/useState"

//DOM
const formulario = ref()

//COMPONENT
const emits = defineEmits(['closeForm'])
const url = inject('artefactoUrl')


//STATE
const artefactosArr = inject('artefactosArr')
const artefactoObject = inject('artefactoObject')

//SUBMIT
const onSubmit = () => {
  guardar(artefactoObject.value, artefactosArr, url)
  onReset();
  //! TODO: No resetear cuando guardar da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  artefactoObject.value = { id: artefactoObject.value.id, nombre: `Artefacto ${artefactosArr.value.length + 1}`, fase: 'Inicio', disciplina: 'Modelado del negocio' }
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
