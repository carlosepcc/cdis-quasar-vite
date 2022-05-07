<template>
  <div>
    <div class="q-gutter-sm row items-center">
      <!-- TABLE / GRID -->
      <q-btn-toggle
        title="Modo de presentación (Tabla o Rejilla)"
        v-model="isTableGrid"
        size="sm"
        toggle-color="primary"
        :options="[
          { value: false, slot: 'tableview' },
          { value: true, slot: 'gridview' },
        ]"
      >
        <template v-slot:tableview>
          <q-icon name="r_table_chart" />
        </template>

        <template v-slot:gridview>
          <q-icon name="r_grid_view" />
        </template>
      </q-btn-toggle>

      <!-- DENSE / NORMAL -->
      <q-btn-toggle
        title="Densidad (Normal o Densa. Sólo en vista de tabla)"
        v-model="isTableDense"
        size="sm"
        class="q-mx-sm"
        toggle-color="primary"
        :options="[
          { value: false, slot: 'normal' },
          { value: true, slot: 'dense' },
        ]"
      >
        <template v-slot:normal>
          <q-icon name="r_table_rows"/>
             </template>

        <template v-slot:dense>
          <q-icon name="view_headline" />
        </template>
      </q-btn-toggle>
    </div>
    <q-table
      :class="tableClass"
      :title="heading"
      :rows="rows"
      :columns="columns"
      :row-key="rowKey"
      :dense="isTableDense"
      :grid="isTableGrid"
      grid-header
      :hide-header="isTableGrid"
      :fullscreen="isTableFullscreen"
      rows-per-page-label="Filas por página"
      :filter="filter"
      selection="multiple"
      v-model:selected="selected"
      separator="vertical"
      :pagination="{ rowsPerPage: 20 }"
    >
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transition:.5s;transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>

      <!-- :flat="!isTableGrid" -->
      <!-- TODO :loading="loading" -->
      <template v-slot:top-left>
        <div class="q-gutter-sm row">
          <!-- FILTER -->
          <q-input
            borderless
            bottom-slots
            v-model="filter"
            label="Filtrar"
            placeholder="Escriba para filtrar.."
            :dense="s.dense"
            hide-bottom-space
            title="Filtrar los elementos de la tabla por coincidencia de texto"
          >
            <template v-slot:prepend>
              <q-icon name="r_search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-show="filter"
                name="r_close"
                @click="filter = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <!-- NUEVA ENTRADA -->
          <q-btn
            flat
            v-show="isTableFullscreen || $q.screen.gt.xs"
            v-if="
              !(
                heading == 'Reportes técnicos' &&
                state.loggedUser.roles[0] == 'Coordinador_de_calidad'
              )
            "
            icon="add"
            :dense="s.dense"
            label="Nueva"
            title="Añadir una nueva entrada en la tabla"
            no-caps
            @click="$emit('openForm')"
          />

          <!-- ELIMINAR SELECCIÓN-->
          <q-btn
            :disabled="selected.length == 0"
            icon="delete"
            label="Eliminar selección"
            no-caps
            text-color="negative"
            flat
            @click="$emit('deleteRows', selected)"
            :dense="s.dense"
          />
        </div>
      </template>

      <template v-slot:top-right>
        <q-btn flat round icon="refresh" @click="$emit('updateList')" title="Actualizar datos"/>
        <!-- FULLSCREEN -->
        <q-toggle
          :dense="s.dense"
          size="lg"
          icon="r_fullscreen"
          v-model="isTableFullscreen"
          title="Pantalla completa"
        />
      </template>

      <template v-slot:body="props">
        <q-tr
          cursor-pointer
          :props="props"
          title="Haga click para modificar esta entrada"
          clickable
          class="cursor-pointer"
          @click="$emit('openForm', props.row)"
        >
          <q-td auto-width>
            <q-checkbox :dense="isTableDense" v-model="props.selected" />
            <!-- TODO: MODIFY -->
            <q-btn
              size="sm"
              text-color="accent"
              flat
              round
              :dense="isTableDense"
              @click.stop="$emit('openForm', props.row)"
              icon="edit"
            />
            <q-btn
              size="sm"
              text-color="negative"
              flat
              round
              :dense="isTableDense"
              @click.stop="$emit('deleteRows', [props.row])"
              icon="delete"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{
            col.value
          }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <q-page-sticky :offset="[18, 18]" class="lt-sm">
      <q-btn
        position="bottom-right"
        fab
        icon="add"
        title="Nueva entrada"
        color="accent"
        @click="$emit('openForm')"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { ref } from "vue";
import state from "src/composables/useState";

import { useQuasar } from "quasar";
const $q = useQuasar();

var s = state.value;
const tableClass = `q-pb-xl overflow-hidden ${
  !$q.dark.isActive ? "bg-light" : ""
}`;
const props = defineProps({
  heading: String,
  rows: Array,
  columns: Array,
  rowKey: {
    type: String,
    default: "id",
  },
});
const emit = defineEmits(["openForm", "deleteRows","updateList"]);

// FILTRAR
const filter = ref("");

// SELECCIONAR
const selected = ref([]);

const isTableGrid = ref($q.screen.lt.sm);
const isTableFullscreen = ref(false);
const isTableDense = ref($q.screen.lt.sm);
</script>
