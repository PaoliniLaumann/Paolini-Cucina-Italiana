class Producto {
  constructor(producto, cantidad) {
    this.id = producto.id;
    this.img = producto.img;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.cantidad = cantidad;
    this.precioTotal = producto.precio;
  }

  agregarUnidad() {
    this.cantidad++;
  }

  quitarUnidad() {
    this.cantidad--;
  }

  actualizarPrecioTotal() {
    this.precioTotal = this.precio * this.cantidad;
  }
}

const productos = [
  {
    id: 0,
    nombre: "Pizza Napolitana",
    categoria: "Pizzas",
    precio: 900,
    img: "../../src/images/image1.webp",
  },
  {
    id: 1,
    nombre: "Pizza Muzzarella",
    categoria: "Pizzas",
    precio: 950,
    img: "../../src/images/image2.webp",
  },
  {
    id: 2,
    nombre: "Pizza con Jamon",
    categoria: "Pizzas",
    precio: 1000,
    img: "../../src/images/image3.webp",
  },
  {
    id: 3,
    nombre: "Pizza Fugazzeta",
    categoria: "Pizzas",
    precio: 1000,
    img: "../../src/images/image2.webp",
  },
  {
    id: 4,
    nombre: "Pizza calabresa",
    categoria: "Pizzas",
    precio: 1100,
    img: "../../src/images/image5.webp",
  },
  {
    id: 5,
    nombre: "Pizza de pepperoni",
    categoria: "Pizzas",
    precio: 1200,
    img: "../../src/images/image6.webp",
  },
  {
    id: 6,
    nombre: "Pizza cuatro quesos",
    categoria: "Pizzas",
    precio: 1200,
    img: "../../src/images/image1.webp",
  },
  {
    id: 7,
    nombre: "Pizza margarita",
    categoria: "Pizzas",
    precio: 1200,
    img: "../../src/images/image2.webp",
  },
  {
    id: 8,
    nombre: "Pizza de champiñones",
    categoria: "Pizzas",
    precio: 1250,
    img: "../../src/images/image3.webp",
  },
  {
    id: 9,
    nombre: "Picada Completa",
    categoria: "Picadas",
    precio: 1600,
    img: "../../src/images/image4.webp",
  },
];

let carrito;

function chequearCarritoEnStorage() {
  let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));
  if (contenidoEnStorage) {
    let array = [];
    for (const objeto of contenidoEnStorage) {
      let producto = new Producto(objeto, objeto.cantidad);
      producto.actualizarPrecioTotal();
      array.push(producto);
    }
    imprimirTabla(array);
    return array;
  }

  return [];
}

function imprimirProductosEnHTML(array) {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
  for (const producto of array) {
    let card = document.createElement("div");
    card.innerHTML = `<div class="card text-center" style="width: 22rem;">
          <div class="card-body">
              <img src="${producto.img}" id="" class="card-img-top img-fluid" alt="">
              <h2 class="card-title fs-3">${producto.nombre}</h2>
              <h5 class="card-subtitle mb-2 text-muted">${producto.categoria}</h5>
              <p class="card-text">$${producto.precio}</p>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button id="agregar${producto.id}" type="button" class="btn btn-dark"> Agregar </button>
              </div>
          </div>
      </div>`;

    contenedor.appendChild(card);
    let boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto.id));
  }
}

function agregarAlCarrito(idProducto) {
  let pizzaEnCarrito = carrito.find((elemento) => elemento.id === idProducto);

  if (pizzaEnCarrito) {
    let index = carrito.findIndex(
      (elemento) => elemento.id === pizzaEnCarrito.id
    );
    carrito[index].agregarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {
    carrito.push(new Producto(productos[idProducto], 1));
  }

  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
  imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
  let producto = carrito.find((producto) => producto.id === id);

  let index = carrito.findIndex((element) => element.id === producto.id);

  if (producto.cantidad > 1) {
    carrito[index].quitarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {
    carrito.splice(index, 1);
  }

  swal("Producto eliminado con éxito", "", "success"); 
  

  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
  imprimirTabla(carrito);
}

function eliminarCarrito() {
  carrito = [];
  localStorage.removeItem("carritoEnStorage");

  document.getElementById("carrito").innerHTML = "";
  document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
  return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function imprimirTabla(array) {
  let precioTotal = obtenerPrecioTotal(array);
  let contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "";

  let tabla = document.createElement("div");

  tabla.innerHTML = `
      <table id="tablaCarrito" class="table text-white text-center">
          <thead>         
              <tr>
                  <th></th>
                  <th>Pizzas</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Accion</th>
              </tr>
          </thead>
          <tbody id="bodyTabla">
          </tbody>
      </table>
  `;

  contenedor.appendChild(tabla);

  let bodyTabla = document.getElementById("bodyTabla");

  for (let producto of array) {
    let datos = document.createElement("tr");
    datos.innerHTML = `
              <img src="${producto.img}" id="" class="card-img-top img-fluid" alt="">
              <td>${producto.nombre}</td>
              <td>${producto.cantidad}</td>
              <td>$${producto.precioTotal}</td>
              <td><button id="eliminar${producto.id}" class="btn btn-dark">Eliminar</button></td>
    `;

    bodyTabla.appendChild(datos);

    let botonEliminar = document.getElementById(`eliminar${producto.id}`);
    botonEliminar.addEventListener("click", () =>
      eliminarDelCarrito(producto.id)
    );
  }

  let accionesCarrito = document.getElementById("acciones-carrito");
  accionesCarrito.innerHTML = `
  <h5>PrecioTotal: $${precioTotal}</h5></br>
  <button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
`;
}

function filtrarBusqueda(e) {
  e.preventDefault();
  let ingreso = document.getElementById("busqueda").value.toLowerCase();
  let arrayFiltrado = productos.filter((elemento) =>
    elemento.nombre.toLowerCase().includes(ingreso)
  );

  imprimirProductosEnHTML(arrayFiltrado);
}

let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

imprimirProductosEnHTML(productos);

carrito = chequearCarritoEnStorage();
