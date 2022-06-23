<template>
  <div>
    <!--TABLE UI SETTINGS-->
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
      :pagination="{ rowsPerPage: 15 }"
      :row-key="rowKey"
      :rows="rows"
      :title="heading"
      grid-header
      rows-per-page-label="Filas por página"
      :selection="canDelete ? 'multiple' : 'none'"
      separator="vertical"
      table-style="max-height:55vh"
    >

      <!-- :flat="!isTableGrid" -->
      <!-- TODO :loading="loading" -->
      <template v-slot:top-left>
        <div class="row">
          <!-- Refrescar-->
          <q-btn flat icon="refresh" title="Actualizar datos" @click="$emit('updateList')"/>

          <!-- FILTER -->
          <q-input
            v-model="filter"
            :dense="s.dense"
            borderless
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
        <!--🗑️ ELIMINAR SELECCIÓN-->
        <q-btn
          v-if="canDelete"
          class="gt-sm"
          :dense="s.dense"
          v-show="selected.length != 0"
          flat
          icon="r_delete_sweep"
          label="Eliminar selección"
          no-caps
          text-color="negative"
          @click="$emit('deleteRows', selected)"
        />

        <!-- NUEVA ENTRADA -->
        <q-btn
          v-if="canCreate || props.canUpdate"
          :icon="canCreate ? 'r_add' : 'r_edit'"
          :title="canCreate ? 'Adicionar nueva entrada' : 'Modificar entrada existente'"
          v-show="isTableFullscreen || $q.screen.gt.xs"
          :dense="s.dense"
          flat
          no-caps
          @click="$emit('openForm')"
        ><slot name="input-btn">{{canCreate ? 'Nueva' : 'Modificar'}}</slot></q-btn>

        <!-- FULLSCREEN -->
        <q-btn
          title="Pantalla completa"
          flat round dense
          :icon="isTableFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="isTableFullscreen = !isTableFullscreen"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th class="actions-column">
            <template v-if="!canDelete">
              Acciones
            </template>
            <template v-else>
            <!--🗑️ ELIMINAR SELECCIÓN-->
            <q-btn
              :dense="s.dense"
              v-show="selected.length > -1"
              :disabled="selected.length === 0"
              flat
              icon="r_delete_sweep"
              title="Eliminar selección"
              no-caps
              class="full-width"
              text-color="negative"
              @click="$emit('deleteRows', selected)"
            />
          </template>
          </q-th>

          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          title="Haga click para ver o modificar esta entrada"
          @click="$emit('openForm', props.row)"
        >

          <q-td auto-width class="actions-column">
            <q-checkbox v-if="canDelete" v-model="props.selected" :dense="isTableDense"/>
            <!-- TODO: MODIFY -->
            <!-- 📝-->
            <q-btn
              spread
              v-if="canUpdate"
              flat

              icon="edit"
              size="sm"
              text-color="accent"
              @click.stop="$emit('openForm', props.row)"
            />

            <!-- 🗑-->
            <q-btn
              v-if="canDelete"
              flat
              icon="delete"
              size="sm"
              text-color="negative"
              @click.stop="$emit('deleteRows', [props.row])"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props" style="max-width:100px;overflow:hidden">{{
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
            <q-card-section class="row">
              <q-checkbox v-if="canDelete" v-model="props.selected" :label="props.cols[0].value" dense/>
<q-space/>
              <!-- 📝-->
              <q-btn
                v-if="canUpdate"
                :dense="isTableDense"
                flat
                icon="r_edit"
                round
                size="sm"
                text-color="accent"
                @click.stop="$emit('openForm', props.row)"
              />

              <!-- 🗑-->
              <q-btn
                v-if="canDelete"
                :dense="isTableDense"
                flat
                icon="r_delete"
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
        v-if="canCreate || canUpdate"
        :icon="canCreate ? 'r_add' : 'r_edit'"
        :title="canCreate ? 'Adicionar nueva entrada' : 'Modificar entrada existente'"
        color="accent"
        fab
        position="bottom-right"
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
const tableClass = `q-pb-xl sticky-header-table overflow-hidden ${
  !$q.dark.isActive ? "bg-light" : ""
}`;
const props = defineProps({
  heading: String,
  rows: Array,
  columns: Array,
  rowKey: { type:String, default: "id" },
  canCreate: { type:Boolean, default: true },
  canDelete: { type:Boolean, default: true },
  canUpdate: { type:Boolean, default: true },
});
const emit = defineEmits(["openForm", "deleteRows", "updateList"]);

// FILTRAR
const filter = ref("");

// SELECCIONAR
const selected = ref([]);

const isTableGrid = ref($q.screen.lt.sm);
const isTableFullscreen = ref(false);
const isTableDense = ref($q.screen.lt.sm);
/*.q-table th.actions-column, .q-table td.actions-column {padding:0;}
*/
</script>
<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  th.actions-column, td.actions-column
    padding: 0

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fafafa !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fafafa

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
