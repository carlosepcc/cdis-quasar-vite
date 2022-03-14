<template>
  <q-dialog position="top" persistent>
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ rtecnicoObject.id ? 'Modificar' : 'Nuevo' }} Reporte Técnico
        <q-btn color="grey" flat icon="close" @click="$emit('closeForm')" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <div>
            <!-- Nombre -->
            <q-input
              clearable
              v-if="state.loggedUser.roles.includes('Asesor_de_calidad')"
              autofocus
              :dense="state.dense"
              filled
              v-model.trim="rtecnicoObject.nombre"
              label="Nombre del Reporte Técnico"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <!-- Local -->
            <q-input
              clearable
              v-if="state.loggedUser.roles.includes('Asesor_de_calidad')"
              :dense="state.dense"
              filled
              v-model.trim="rtecnicoObject.local"
              label="Local"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />
            <!-- Fecha de inicio -->
            <q-input
              clearable
              v-if="state.loggedUser.roles.includes('Asesor_de_calidad')"
              :dense="state.dense"
              filled
              v-model="rtecnicoObject.fechaI"
              label="Fecha de inicio"
              type="date"
              stack-label
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />
            <!-- Fecha de cumplimiento -->
            <q-input
              clearable
              v-if="state.loggedUser.roles.includes('Asesor_de_calidad')"
              :dense="state.dense"
              filled
              v-model="rtecnicoObject.fechaC"
              label="Fecha de cumplimiento"
              type="date"
              stack-label
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <!-- Descripción -->
            <q-input
              clearable
              v-if="state.loggedUser.roles.includes('Asesor_de_calidad')"
              :dense="state.dense"
              label="Descripción"
              v-model.trim="rtecnicoObject.descripcion"
              filled
              autogrow
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <!-- Estado -->
            <q-select
              v-if="state.loggedUser.roles.includes('Coordinador_de_calidad') && rtecnicoObject.id"
              :dense="state.dense"
              v-model="rtecnicoObject.estado"
              default
              filled
              :options="['Creado', 'Abortado', 'Revisado']"
              label="Estado"
              lazy-rules
              :rules="[val || 'Por favor, seleccione algo']"
            />

            <!-- Revisor -->
            <q-select
              clearable
              v-if="state.loggedUser.roles.includes('Coordinador_de_calidad') && rtecnicoObject.id"
              :dense="state.dense"
              v-model="rtecnicoObject.revisor"
              default
              filled
              :options="usersByRole.Revisor"
              option-label="nombre"
              label="Revisor"
              lazy-rules
              :rules="[val || 'Por favor, seleccione un trabajador']"
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
              :label="rtecnicoObject.id ? 'Modificar' : 'Guardar'"
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
const url = inject('rtecnicoUrl')


//STATE
const rtecnicosArr = inject('rtecnicosArr')
const rtecnicoObject = inject('rtecnicoObject')

//SUBMIT
const onSubmit = () => {
  guardar(rtecnicoObject.value, rtecnicosArr, url)
  onReset();
  //! TODO: No resetear cuando guardar da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  rtecnicoObject.value = {}
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
