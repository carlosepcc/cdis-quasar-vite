import { Screen } from "quasar";
import { ref } from "vue";
const hours = new Date().getHours();
// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  dark: hours > 18 || hours < 7, //fallback from $q.dark
  loggedUser: false,
});

// Usuarios registrados
export const usersArr = ref([
  {
    nombre: "Ana Rodríguez",
    username: "ana",
    cargo: "Estudiante",
    permisos: ["ROLE_C_ROL"],
  },
  {
    nombre: "Era González",
    username: "era",
    cargo: "Decano",
    permisos: ["ROLE_C_DENUNCIA"],
  },
]);
export const rolesArr = ref([]);
export const denunciasArr = ref([]);
export const casosArr = ref([]);
export const declaracionesArr = ref([]);
export const comisionesArr = ref([]);
export const permisosArr = ref([
  { id: 8, permiso: "ROLE_R_ROL" },
  { id: 1, permiso: "ROLE_C_ROL" },
  { id: 2, permiso: "ROLE_U_ROL" },
  { id: 3, permiso: "ROLE_D_ROL" },
  { id: 40, permiso: "ROLE_R_COMISION" },
  { id: 4, permiso: "ROLE_C_COMISION" },
  { id: 5, permiso: "ROLE_U_COMISION" },
  { id: 6, permiso: "ROLE_D_COMISION" },
  { id: 7, permiso: "ROLE_C_CASO" },
  { id: 9, permiso: "ROLE_D_CASO" },
]);

//F: recibe una cadena y la transforma de "ROLE_C_EJEMPLO" a "Crear ejemplo"
const permisoStrToLabel = (permisoStr) => {
  let permisoLabel = permisoStr;
  let rules = [
    { s: "role", r: "" },
    { s: "_c_", r: "Crear " },
    { s: "_r_", r: "Leer " },
    { s: "_u_", r: "Actualizar " },
    { s: "_d_", r: "Eliminar " },
    { s: "cion", r: "ción" },
    { s: "comision", r: "comisión" },
  ];
  permisoLabel = permisoLabel.toLowerCase();
  rules.forEach((rule) => {
    permisoLabel = permisoLabel.replace(rule.s, rule.r);
  });
  return permisoLabel;
};

//F: Recibe un arreglo de objetos de permiso y les anhade a cada uno un atributo label usando la funcion permisoStrToLabel en base al atributo permiso
export const permisosArrToLabeled = (permisosObjs) => {
  permisosObjs.forEach(
    (permisoObj) => (permisoObj.label = permisoStrToLabel(permisoObj.permiso))
  );
};

export default state;
