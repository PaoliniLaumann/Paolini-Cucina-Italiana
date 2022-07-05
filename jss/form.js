const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector("#inputNombre");
const inputEmail = document.querySelector("#inputEmail");
const inputTelefono = document.querySelector("#inputTelefono");
const inputRecomendaciones = document.querySelector("#inputRecomendaciones");
const inputFecha = document.querySelector("#inputFecha");
const inputPersonas = document.querySelector("#inputPersonas");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datosUsuario = {
    name: inputNombre.value,
    email: inputEmail.value,
    telefono: inputTelefono.value,
    recomendaciones: inputRecomendaciones.value,
    fecha: inputFecha.value,
    cantidad: inputPersonas.value,
  };
  
  validar(datosUsuario);
});

const validar = (datosUsuario) => {
  if (datosUsuario.name && datosUsuario.email && datosUsuario.fecha !== "") {
    mensajeExitoso(datosUsuario);
    guardarStorage(datosUsuario);
  } else {
    mensajeError(datosUsuario);
  }
};

const guardarStorage = (datosUsuario) => {
  localStorage.setItem(`obj`, JSON.stringify(datosUsuario));
  obtenerStorage();
};

const obtenerStorage = () => {
  const storage = JSON.parse(localStorage.getItem("obj"));
  console.log(storage, "SOY DEL STORAGE");
};

const mensajeExitoso = (datosUsuario) => {
  swal(
    `Hola ${datosUsuario.name},tu reserva para el dia ${datosUsuario.fecha} se realizo con exito
    te llegara la confirmacion a ${datosUsuario.email}`,
    "",
    "success"
  );
};

const mensajeError = (datosUsuario) => {
  swal(`Hola tienes que ingresar tus datos`, "", "error");
};
 