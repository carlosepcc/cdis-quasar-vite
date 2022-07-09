import { ref, watch } from "vue";

import { Screen } from "quasar";

const hours = new Date().getHours();
// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  dark: hours > 18 || hours < 7, //fallback from $q.dark
  loggedUser: false,
  mockUser: {
    rol: "ROLE_ADMIN",
    permisos: [
      "ROLE_C_COMISION",
      "ROLE_U_COMISION",
      "ROLE_R_COMISION",
      "ROLE_C_CASO",
    ],
    nombre: "Naielhi",
    usuario: "naie",
    cargo: "Profesor",
    idrol: -1,
  },
});
export const pathToCurso = (path) => path.replace("ARCHIVOS/RESOLUCIONES/", "");
export const resolucionesArr = ref([]);
export const rolesArr = ref([]);
export const denunciasArr = ref([]);
export const casosArr = ref([]);
export const declaracionesArr = ref([]);
export const comisionesArr = ref([]);
export const permisosArr = ref([]);
watch(permisosArr, () => permisosArrToLabeled(permisosArr.value)); // Se actualizan las etiquetas de los permisos cada vez que mute el arreglo

// Usuarios registrados
export const usersArr = ref([]);
//def: recibe una cadena y la transforma de "ROLE_C_EJEMPLO" a "Crear ejemplo"
export const permisoStrToLabel = (permisoStr) => {
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

//def: Recibe un arreglo de objetos de permiso y les anhade a cada uno un atributo label usando la funcion permisoStrToLabel en base al atributo permiso
export const permisosArrToLabeled = (permisosObjs) => {
  permisosObjs.forEach(
    (permisoObj) => (permisoObj.label = permisoStrToLabel(permisoObj.permiso))
  );
};

export const userHasPermission = (
  permisoStr = "",
  user = state.value.loggedUser
) => user.permisos.includes(permisoStr);

export default state;
