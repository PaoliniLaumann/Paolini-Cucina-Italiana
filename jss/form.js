const formulario = document.querySelector("#formulario");

formulario.addEventListener( "submit", validarFormulario );

function validarFormulario (e) {
    e.preventDefault();
    const nombre = document.querySelector("#inputNombre").value
    const email = document.querySelector("#inputEmail").value
    const telefono = document.querySelector("#inputTelefono").value
    const recomendaciones = document.querySelector("#inputRecomendaciones").value
    const fecha = document.querySelector("#inputFecha").value
    const cantidad = document.querySelector("#inputPersonas").value
    console.log(nombre, email, telefono, recomendaciones, fecha, cantidad)
    swal(`HOLA ${nombre},tu reserva para el dia ${fecha} se realizo con exito`, "", "success");
};

