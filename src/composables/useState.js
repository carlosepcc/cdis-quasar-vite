import { Screen } from "quasar";
import { ref } from "vue";
const hours = new Date().getHours();
// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  dark: hours > 18 || hours < 7, //fallback from $q.dark
  loggedUser: null,
});

// Usuarios registrados
export const usersArr = ref([
  {
    nombre: "Foo",
    username: "foo",
    cargo: "Estudiante",
    permisos: ["ROLE_C_ROL"],
  },
  {
    nombre: "Bar",
    username: "bar",
    cargo: "Decano",
    permisos: "ROLE_MODC",
  },
]);
export const rolesArr = ref([]);
export const denunciasArr = ref([]);

export default state;
