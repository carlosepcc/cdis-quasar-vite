<template>
  <div>
    <q-separator v-if="separate" class="q-mt-lg" />
    <q-item clickable v-ripple :to="to" :title="`Ir a ${title}`">
      <q-item-section avatar>
        <q-icon v-if="icon" :name="icon" />
        <span v-else>{{ alt }}</span>
      </q-item-section>
      <q-item-section>
        {{ title }}
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  separate: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
  forRoles: {
    type: Array,
  }
})
</script>
