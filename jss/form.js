let nombreUsuario;
let fechaReserva;

const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#inputNombre");
const email = document.querySelector("#inputEmail");
const telefono = document.querySelector("#inputTelefono");
const recomendaciones = document.querySelector("#inputRecomendaciones");
const fecha = document.querySelector("#inputFecha");
const cantidad = document.querySelector("#inputPersonas");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  nombreUsuario = nombre.value;
  fechaReserva = fecha.value;

  localStorage.setItem(`nombre`, nombre.value);
  localStorage.setItem(`email`, email.value);
  localStorage.setItem(`telefono`, telefono.value);
  localStorage.setItem(`recomendaciones`, recomendaciones.value);
  localStorage.setItem(`fecha`, fecha.value);
  localStorage.setItem(`cantidad`, cantidad.value);
  mensaje();
});

const mensaje = () => {
  swal(
    `HOLA ${nombreUsuario},tu reserva para el dia ${fechaReserva} se realizo con exito`,
    "",
    "success"
  );
};
