import { ref, watch } from "vue";

import { Screen } from "quasar";

const hours = new Date().getHours();
// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  dark: hours > 18 || hours < 7, //fallback from $q.dark
  loggedUser: false,
  mockUser:{"rol": "ROLE_ADMIN", "permisos": [ "ROLE_C_COMISION", "ROLE_U_COMISION", "ROLE_R_COMISION", "ROLE_C_CASO", ],"nombre": "Naielhi", "usuario": "naie", "cargo": "Profesor", "idrol": -1 }
});

export const resolucionesArr = ref([])
export const rolesArr = ref([]);
export const denunciasArr = ref([
    {"id":1,"denunciante":"admin","fecha":"2022-06-18","procesada":false,
      "descripcion":"En la noche..","usuarioList":[]},
    {"id":2,"denunciante":"admin","fecha":"2022-06-18","procesada":false,
      "descripcion":"Sucedio que","usuarioList":[
        {"usuario":"admin","nombre":"admin","contrasena":"$","cargo":"ADMIN",},
      ],
    }
  ]);
export const casosArr = ref([]);
export const declaracionesArr = ref([]);
export const comisionesArr = ref([]);
export const permisosArr = ref([
  {
    id: 1,
    permiso: "ROLE_C_ROL"
  },
  {
    "id": 2,
    "permiso": "ROLE_U_ROL"
  },
  {
    "id": 3,
    "permiso": "ROLE_D_ROL"
  },
  {
    "id": 4,
    "permiso": "ROLE_C_COMISION"
  },
  {
    "id": 5,
    "permiso": "ROLE_U_COMISION"
  },
  {
    "id": 6,
    "permiso": "ROLE_D_COMISION"
  },
  {
    "id": 7,
    "permiso": "ROLE_C_CASO"
  },
  {
    "id": 8,
    "permiso": "ROLE_R_ROL"
  },
  {
    "id": 9,
    "permiso": "ROLE_D_CASO"
  },
  {
    "id": 10,
    "permiso": "ROLE_C_RESOLUCION"
  },
  {
    "id": 11,
    "permiso": "ROLE_U_RESOLUCION"
  },
  {
    "id": 12,
    "permiso": "ROLE_D_RESOLUCION"
  },
  {
    "id": 13,
    "permiso": "ROLE_C_USUARIO"
  },
  {
    "id": 14,
    "permiso": "ROLE_R_USUARIO"
  },
  {
    "id": 15,
    "permiso": "ROLE_U_USUARIO"
  },
  {
    "id": 16,
    "permiso": "ROLE_D_USUARIO"
  },
  {
    "id": 17,
    "permiso": "ROLE_R_RESOLUCION"
  },
  {
    "id": 18,
    "permiso": "ROLE_C_EXPEDIENTE"
  },
  {
    "id": 19,
    "permiso": "ROLE_R_EXPEDIENTE"
  },
  {
    "id": 20,
    "permiso": "ROLE_U_EXPEDIENTE"
  },
  {
    "id": 21,
    "permiso": "ROLE_D_EXPEDIENTE"
  },
  {
    "id": 22,
    "permiso": "ROLE_C_DICTAMEN"
  },
  {
    "id": 23,
    "permiso": "ROLE_R_DICTAMEN"
  },
  {
    "id": 24,
    "permiso": "ROLE_U_DICTAMEN"
  },
  {
    "id": 25,
    "permiso": "ROLE_D_DICTAMEN"
  },
  {
    "id": 26,
    "permiso": "ROLE_C_DENUNCIA_USUARIO"
  },
  {
    "id": 27,
    "permiso": "ROLE_R_DENUNCIA_USUARIO"
  },
  {
    "id": 28,
    "permiso": "ROLE_U_DENUNCIA_USUARIO"
  },
  {
    "id": 29,
    "permiso": "ROLE_D_DENUNCIA_USUARIO"
  },
  {
    "id": 30,
    "permiso": "ROLE_C_DENUNCIA"
  },
  {
    "id": 31,
    "permiso": "ROLE_R_DENUNCIA"
  },
  {
    "id": 32,
    "permiso": "ROLE_U_DENUNCIA"
  },
  {
    "id": 33,
    "permiso": "ROLE_D_DENUNCIA"
  },
  {
    "id": 34,
    "permiso": "ROLE_C_DECLARACION"
  },
  {
    "id": 35,
    "permiso": "ROLE_R_DECLARACION"
  },
  {
    "id": 36,
    "permiso": "ROLE_U_DECLARACION"
  },
  {
    "id": 37,
    "permiso": "ROLE_D_DECLARACION"
  },
  {
    "id": 38,
    "permiso": "ROLE_R_CASO"
  },
  {
    "id": 39,
    "permiso": "ROLE_U_CASO"
  },
  {
    "id": 40,
    "permiso": "ROLE_R_COMISION"
  },
  {
    "id": 41,
    "permiso": "ROLE_R_PERMISO"
  }
])
watch(permisosArr,()=>permisosArrToLabeled(permisosArr.value)) // Se actualizan las etiquetas de los permisos cada vez que mute el arreglo

// Usuarios registrados
export const usersArr = ref([
  {
    nombre: "Admin",
    username: "admin",
    cargo: "Administrador",
    permisos: permisosArr.value,
  },
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
//F: recibe una cadena y la transforma de "ROLE_C_EJEMPLO" a "Crear ejemplo"
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

//F: Recibe un arreglo de objetos de permiso y les anhade a cada uno un atributo label usando la funcion permisoStrToLabel en base al atributo permiso
export const permisosArrToLabeled = (permisosObjs) => {
  permisosObjs.forEach(
    (permisoObj) => (permisoObj.label = permisoStrToLabel(permisoObj.permiso))
  );
};

export const userHasPermission =
  (permisoStr = "ROlE_R_DENUNCIA", user = state.value.loggedUser) =>
    user ?
    user.permisos.some((permisoObj) => permisoStr === permisoObj.permiso)
    : false

export default state;
