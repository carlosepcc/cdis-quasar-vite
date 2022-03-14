<template>
  <q-dialog position="top" persistent @show="updateData">
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ minutaObject.id ? 'Modificar' : 'Nueva' }} Minuta
        <q-btn color="grey" flat icon="close" @click="$emit('closeForm')" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <!-- Fields -->
          <div>
            <q-input
              clearable
              autofocus
              :dense="state.dense"
              filled
              v-model.trim="minutaObject.nombreP"
              label="Proyecto"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-select
              :dense="state.dense"
              v-model="minutaObject.revisor"
              default
              filled
              :options="usersByRole.Revisor"
              option-label="nombre"
              label="Revisor"
              lazy-rules
              :rules="[val || 'Por favor, seleccione un trabajador']"
            />

            <q-select
              :dense="state.dense"
              v-model="minutaObject.encargado"
              filled
              :options="usersByRole.Encargado_de_proyecto"
              option-label="nombre"
              emit-value
              label="Encargado"
              lazy-rules
              :rules="[val || 'Por favor, seleccione un trabajador']"
            />

            <q-input
              clearable
              :dense="state.dense"
              label="Acuerdos"
              v-model.trim="minutaObject.acuerdos"
              filled
              autogrow
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />
          </div>
          <q-separator class="q-mb-sm q-mt-md" />

          <!-- Actions -->
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
              :label="minutaObject.id ? 'Modificar' : 'Guardar'"
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
import { usersByRole } from 'src/composables/useState'

//DOM
const formulario = ref()

//COMPONENT
const emits = defineEmits(['closeForm'])
const url = inject('minutaUrl')


//STATE
const minutasArr = inject('minutasArr')
const minutaObject = inject('minutaObject')


//SUBMIT
const onSubmit = () => {
  guardar(minutaObject.value, minutasArr, url)
  onReset();
  //! TODO: No resetear cuando guardar da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  minutaObject.value = { id: minutaObject.value.id }
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
