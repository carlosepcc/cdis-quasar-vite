<template>
  <div>
    <div class="q-gutter-sm row items-center">
      <!-- TABLE / GRID -->
      <q-btn-toggle
        v-model="isTableGrid"
        :options="[
          { value: false, slot: 'tableview' },
          { value: true, slot: 'gridview' },
        ]"
        size="sm"
        title="Modo de presentación (Tabla o Rejilla)"
        toggle-color="primary"
      >
        <template v-slot:tableview>
          <q-icon name="r_table_chart"/>
        </template>

        <template v-slot:gridview>
          <q-icon name="r_grid_view"/>
        </template>
      </q-btn-toggle>

      <!-- DENSE / NORMAL -->
      <q-btn-toggle
        v-model="isTableDense"
        :options="[
          { value: false, slot: 'normal' },
          { value: true, slot: 'dense' },
        ]"
        class="q-mx-sm"
        size="sm"
        title="Densidad (Normal o Densa. Sólo en vista de tabla)"
        toggle-color="primary"
      >
        <template v-slot:normal>
          <q-icon name="r_table_rows"/>
        </template>

        <template v-slot:dense>
          <q-icon name="view_headline"/>
        </template>
      </q-btn-toggle>
    </div>
    <q-table
      v-model:selected="selected"
      :class="tableClass"
      :columns="columns"
      :dense="isTableDense"
      :filter="filter"
      :fullscreen="isTableFullscreen"
      :grid="isTableGrid"
      :hide-header="isTableGrid"
      :pagination="{ rowsPerPage: 20 }"
      :row-key="rowKey"
      :rows="rows"
      :title="heading"
      grid-header
      rows-per-page-label="Filas por página"
      selection="multiple"
      separator="vertical"
    >

      <!-- :flat="!isTableGrid" -->
      <!-- TODO :loading="loading" -->
      <template v-slot:top-left>
        <div class="row">
          <!-- NUEVA ENTRADA -->
          <q-btn
            v-if="
              !(
                heading == 'Reportes técnicos' &&
                state.loggedUser.roles[0] == 'Coordinador_de_calidad'
              )
            "
            v-show="isTableFullscreen || $q.screen.gt.xs"
            :dense="s.dense"
            flat
            icon="add"
            label="Nueva"
            no-caps
            title="Añadir una nueva entrada en la tabla"
            @click="$emit('openForm')"
          />

          <!-- ELIMINAR SELECCIÓN-->
          <q-btn
            :dense="s.dense"
            :disabled="selected.length == 0"
            flat
            icon="delete"
            label="Eliminar selección"
            no-caps
            text-color="negative"
            @click="$emit('deleteRows', selected)"
          />

          <!-- FILTER -->
          <q-input
            v-model="filter"
            :dense="s.dense"
            borderless
            bottom-slots
            hide-bottom-space
            label="Filtrar"
            placeholder="Escriba para filtrar.."
            title="Filtrar los elementos de la tabla por coincidencia de texto"
          >
            <template v-slot:prepend>
              <q-icon name="r_search"/>
            </template>
            <template v-slot:append>
              <q-icon
                v-show="filter"
                class="cursor-pointer"
                name="backspace"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:top-right>
        <!-- Refrescar-->
        <q-btn flat icon="refresh" round title="Actualizar datos" @click="$emit('updateList')"/>
        <!-- FULLSCREEN -->
        <q-toggle
          v-model="isTableFullscreen"
          :dense="s.dense"
          icon="r_fullscreen"
          size="lg"
          title="Pantalla completa"
        />
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"

          title="Haga click para ver o modificar esta entrada"
          @click="$emit('openForm', props.row)"
        >
          <q-td auto-width>
            <q-checkbox v-model="props.selected" :dense="isTableDense"/>

            <!-- TODO: MODIFY -->
            <!-- 📝-->
            <q-btn
              :dense="isTableDense"
              flat
              icon="edit"
              round
              size="sm"
              text-color="accent"
              @click.stop="$emit('openForm', props.row)"
            />

            <!-- 🗑-->
            <q-btn
              :dense="isTableDense"
              flat
              icon="delete"
              round
              size="sm"
              text-color="negative"
              @click.stop="$emit('deleteRows', [props.row])"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{
              col.value
            }}
          </q-td>
        </q-tr>
      </template>

      <!--      CARD VIEW-->

      <template v-slot:item="props">
        <div :style="props.selected ? 'transition:.2s;transform: scale(0.95);' : ''"
             class="cursor-pointer q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
             title="Haga click para ver o modificar esta entrada"
             @click.stop="$emit('openForm', props.row)"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <!-- CARD HEADER-->
            <q-card-section>
              <q-checkbox v-model="props.selected" :label="props.cols[0].value" dense/>

              <!-- 📝-->
              <q-btn
                :dense="isTableDense"
                flat
                icon="edit"
                round
                size="sm"
                text-color="accent"
                @click.stop="$emit('openForm', props.row)"
              />

              <!-- 🗑-->
              <q-btn
                :dense="isTableDense"
                flat
                icon="delete"
                round
                size="sm"
                text-color="negative"
                @click.stop="$emit('deleteRows', [props.row])"
              />
            </q-card-section>

            <q-separator/>

            <!-- CARD BODY-->
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section class="col">
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section class="col" side>
                  <q-item-label>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-page-sticky :offset="[18, 18]" class="lt-sm">
      <q-btn
        color="accent"
        fab
        icon="add"
        position="bottom-right"
        title="Nueva entrada"
        @click="$emit('openForm')"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import {ref} from "vue";
import state from "src/composables/useState";

import {useQuasar} from "quasar";

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
const emit = defineEmits(["openForm", "deleteRows", "updateList"]);

// FILTRAR
const filter = ref("");

// SELECCIONAR
const selected = ref([]);

const isTableGrid = ref($q.screen.lt.sm);
const isTableFullscreen = ref(false);
const isTableDense = ref($q.screen.lt.sm);
</script>
