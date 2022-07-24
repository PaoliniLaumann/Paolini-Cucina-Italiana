const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector("#inputNombre");
const inputEmail = document.querySelector("#inputEmail");
const inputTelefono = document.querySelector("#inputTelefono");
const inputRecomendaciones = document.querySelector("#inputRecomendaciones");
const inputFecha = document.querySelector("#inputFecha");
const inputPersonas = document.querySelector("#inputPersonas");

formulario.addEventListener("submit", (e) => {
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
  if (
    datosUsuario.name &&
    datosUsuario.email &&
    datosUsuario.fecha &&
    datosUsuario.telefono &&
    datosUsuario.cantidad !== ""
  ) {
    mensajeExitoso(datosUsuario);
    guardarStorage(datosUsuario);
  } else {
    mensajeError(datosUsuario);
  }
};

const guardarStorage = (datosUsuario) => {
  localStorage.setItem(`reserva`, JSON.stringify(datosUsuario));
  obtenerStorage();
};

const obtenerStorage = () => {
  const storage = JSON.parse(localStorage.getItem("reserva"));
};

const mensajeExitoso = (datosUsuario) => {
  const fechaActual = new Date(datosUsuario.fecha);
  fechaActual.setMinutes(
    fechaActual.getMinutes() + fechaActual.getTimezoneOffset()
  );
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaReserva = fechaActual.toLocaleDateString("es-ES", opciones);
  swal.fire(
    `Hola ${datosUsuario.name},tu reserva para ${datosUsuario.cantidad} personas el dia ${fechaReserva} se realizo con exito
    te llegara la confirmacion a ${datosUsuario.email}`,
    "",
    "success"
  );

};

const mensajeError = () => {
  swal.fire(`Hola tienes que ingresar todos los datos`, "", "error");
};
