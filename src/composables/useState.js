import { Screen } from "quasar";
import { ref } from "vue";
const hours = new Date().getHours()
// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  dark: hours > 18 || hours < 7, //fallback from $q.dark
  loggedUser: null,
});

// Usuarios registrados
export const usersArr = ref([]);

export const usersByRole = ref({
  Revisor: [],
  Encargado_de_proyecto: [],
});
export default state;
