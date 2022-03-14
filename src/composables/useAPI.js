import {Dialog, Notify, QSpinnerGears} from "quasar";
import isJwtTokenExpired, {decode} from "jwt-check-expiry";
import state, {usersArr, usersByRole} from "./useState";

import {api} from "boot/axios";
import {handleError} from "vue";
import route from "src/router";

const Router = route();
console.log("🚀 useAPI Router", Router);

//Si se le pasa un token, lo guarda. Luego devuelve si hay un token guardado y no ha expirado.
export const autorizar = (token) => {
  console.log("🚀 useAPI autorizar");

  // Usuario del token
  let user = null;

  // Si se recibe un token y este no ha expirado, se guarda en localStorage tanto el token mismo como el usuario decodificado
  if (token && !isJwtTokenExpired(token)) {
    console.log(
      "🚀 useAPI.js line 18 autorizar !isJwtTokenExpired(token)",
      !isJwtTokenExpired(token)
    );
    console.log("🚀 useAPI.js line 18 autorizar token != null", token != null);

    localStorage.setItem("token", token);
    user = decode(token).payload.user;
    localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  // Luego se procede a revisar si hay un token guardado en localStorage
  let storedToken = localStorage.getItem("token");
  console.log("🚀 useAPI.js line 24 autorizar localStorageToken", storedToken);

  // ..y, si este existe y no ha expirado, se actualiza el estado con los datos de usuario autenticado decodificado en localStorage y se establece el header de Autorization de axios
  if (storedToken && !isJwtTokenExpired(storedToken)) {
    state.value.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    api.defaults.headers.common["Authorization"] = storedToken;
    console.log(
      "🚀 useAPI.js line 29 autorizar state.value.loggedUser",
      state.value.loggedUser
    );
    // si no existe o ya expiró, se elimina de locaStorage y se enruta a la página inicial para que el usuario inicie sesión.
  } else {
    Router.replace("/");
    console.log(
      "🚀 useAPI  autorizar localStorage.removeItem('token')",
      localStorage.removeItem("token")
    );
    console.log("🚀 $router.replace('/')");
  }

  return storedToken ? isJwtTokenExpired(storedToken) : false;
  // DECODED RESPONSE
  /*{
"exp": 1646010970,
"user": {
"id": 1,
"username": "carlose",
"nombre": "Carlos",
"apellidos": "Enrique",
"roles": ["ROLE_ADMIN"]
},
"iat": 1645974970
}*/
};

export const login = (loginObject) => {
  let noti = Notify.create({
    type: "ongoing",
    message: `Iniciando sesión para ${loginObject.usuario}`,
    spinner: QSpinnerGears,
    actions: [{label: "Ocultar", color: "white"}],
  });

  api({
    url: "/Usuario/loginUsuario",
    method: "POST",
    data: loginObject,
    headers: {"Content-Type": "application/json"},
  })
    .then((response) => {
      console.log(response);

      let token = response.data.token;
      console.log('Token:', token);

      // Almacenar en localStorage, chequear y actualizar estado global
      autorizar(token);

      // Notificación
      noti({
        type: "positive",
        spinner: null,
        message: `Sesión iniciada`,
        actions: [{label: "OK", color: "white"}],
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: useAPI.js ~ line 189 ~ guardar ~ error", error);
      notifyError(error, noti, "No se pudo iniciar sesión");
    });
};

export const listarUsersByRole = () => {
  api
    .get("/usuario/findByRol", {params: {rol: "Revisor"}})
    .then((response) => {
      console.log("🚀 useAPI.js line 115 api.get response", response);
      usersByRole.value.Revisor = response.data;
    })
    .catch((error) =>
      console.log("No se pudo obtener la lista de revisores", error)
    );

  api
    .get("/usuario/findByRol", {params: {rol: "Encargado_de_proyecto"}})
    .then((response) => {
      console.log("🚀 useAPI.js 115 api.get response", response);
      usersByRole.value.Encargado_de_proyecto = response.data;
    })
    .catch((error) =>
      console.log(
        "No se pudo obtener la lista de encargados de proyecto",
        error
      )
    );
};

// LISTAR (Actualizar Arreglos en el cliente con datos del servidor)
const listar = (list = usersArr, url = "/usuario") => {
  let noti = Notify.create({
    type: "ongoing",
    message: `Accediendo al listado ${url}`,
    spinner: QSpinnerGears,
    actions: [{label: "Ocultar", color: "white"}],
  });

  api
    .get(url)
    .then((response) => {
      noti({timeout: 100});
      // handle success
      list.value = response.data;
    })
    .catch((error) => {
      // handle error
      console.log("🚀 ~ file: useAPI.js ~ line 189 ~ guardar ~ error", error);
      notifyError(
        error,
        {
          message: `Carga fallida de ${url}. ${error.response.data.message}`,
        },
        noti
      );
    });
};
// Pedir registro de nuevo objeto o la modificación de uno existente en la base de datos
export const guardar = (object, refArr, url = "/Usuario") => {
  console.log("🚀 useAPI 162 guardar refArr", refArr);
  console.log("🚀 useAPI 162 guardar object", object);
  let noti = Notify.create({
    type: "ongoing",
    message: `Guardando. ${url}`,
    spinner: QSpinnerGears,
    actions: [{label: "Ocultar", color: "white"}],
  });

  api({
    method: object.id ? "put" : "post",
    url: url,
    data: object,
  })
    .then((response) => {
      // handle success
      noti({
        type: "positive",
        spinner: null,
        message: "Acción realizada con éxito.",
        actions: [{label: "OK", color: "white"}],
      });
      listar(refArr, url);
    })
    .catch((error) => {
      console.log("🚀 ~ file: useAPI.js ~ line 189 ~ guardar ~ error", error);
      notifyError(error, noti, "Guardado fallido");
    });
};

// Pedir la eliminación de objetos en la base de datos
export const eliminar = (objArr = [], list, url = "/usuario") => {
  console.log("Eliminar");
  Dialog.create({
    title: "Confirme la eliminación",
    message: "La eliminación será permanente.",
    persistent: true,
    color: "negative",
    ok: {label: "Eliminar", noCaps: true, flat: true},
    cancel: {color: "primary", noCaps: true, flat: true},
  })
    .onOk(() => {
      let noti = Notify.create({
        type: "ongoing",
        position: "bottom",
        message: `Eliminando ${objArr.length} entrada${
          objArr.length == 1 ? "." : "s."
        } ${url}`,
        spinner: QSpinnerGears,
        actions: [{label: "Ocultar", color: "white"}],
      });

      //CREATE an idsArray from the objects array
      let idsUrl = url + '/'
      console.log(idsUrl);
      objArr.forEach((obj) => idsUrl.push(`${obj.id},`));
      console.log(idsUrl);
      idsUrl.pop()
      console.log(idsUrl);
      //REQUEST TO SERVER
      api({
        method: "delete",
        url: idsUrl,
      })
        .then((response) => {
          // handle success
          listar(list, url);
          noti({
            type: "positive",
            spinner: null,
            // message: `Eliminación exitosa de (${idsArr.length}) entrada${idsArr.length == 1 ? "." : "s."  })`,
            message: "Acción realizada con éxito.",
            timeout: 1000,
            actions: [{label: "OK", color: "white"}],
          });
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: useAPI.js ~ line 189 ~ guardar ~ error",
            error
          );
          notifyError(
            error,
            noti,
            (heading = `Eliminación fallida de ${url.slice(0, 1)}`)
          );
        })
        .then(() => {
          // always
          return idsArr;
        });
    })
    .onCancel(() => {
      return "Canceled by user";
    });
};

// LOCAL FUNCTIONS
const notifyError = (error, noti, heading = "Acción fallida", notiConfig) => {
  notiConfig = {
    ...{
      type: "negative",
      spinner: null,
      icon: "report_problem",
      actions: [{label: "OK", color: "white"}],

      message: `${heading}. ${error.message}.`,
    },
    ...notiConfig,
  };

  // handle error
  if (error.response) {
    let serverMessage = error.response.data.message
      ? error.response.data.message
      : error.response.data.error == "Forbidden" &&
      error.response.data.path == "/login"
        ? "Credenciales inválidas"
        : error.response.data.error;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(
      "The request was made and the server responded with a status code that falls out of the range of 2xx. ERROR.RESPONSE: ",
      error.response
    );

    notiConfig.message = `${heading}. ${serverMessage}.`;

    noti(notiConfig);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(
      "The request was made but no response was received. ERROR.REQUEST: ",
      error.request
    );
  } else {
    console.log(
      "Something happened in setting up the request that triggered an Error ",
      error
    );

    notiConfig.message = `${heading}. ${error.message}.`;
    noti(notiConfig);
  }
};
export default listar;
