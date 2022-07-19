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

fetch(
  `https://paolinilaumann.github.io/Paolini-Cucina-Italiana/json/productos.json`
)
  .then((res) => res.json())
  .then((array) => {
    imprimirProductosEnHTML(array);
    function agregarAlCarrito(idProducto, nombre_pro) {
      let pizzaEnCarrito = carrito.find(
        (elemento) => elemento.id === idProducto
      );

      if (pizzaEnCarrito) {
        let index = carrito.findIndex(
          (elemento) => elemento.id === pizzaEnCarrito.id
        );
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
      } else {
        carrito.push(new Producto(array[idProducto], 1));
      }
      Toastify({
        text: `${nombre_pro} se Agrego con Exito`,
        className: "info",
        style: {
          background: "linear-gradient(to right,  #90f511 ,  #2ae33b)",
          color: "#000000",
        },
      }).showToast();
      localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
      imprimirTabla(carrito);
    }
    function filtrarBusqueda(e) {
      e.preventDefault();
      let arrayFiltrado = [];
      let ingreso = document.getElementById("busqueda").value.toLowerCase();
      arrayFiltrado = array.filter((elemento) =>
        elemento.nombre.toLowerCase().includes(ingreso)
      );

      imprimirProductosEnHTML(arrayFiltrado);
      
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
                <button id="agregar${producto.id}" type="button" class="btn btn-success"> Agregar </button>
            </div>
        </div>
    </div>`;

        contenedor.appendChild(card);
        let boton = document.getElementById(`agregar${producto.id}`);
        boton.addEventListener("click", () =>
          agregarAlCarrito(producto.id, producto.nombre)
        );
      }
    }

    let btnFiltrar = document.getElementById("btnFiltrar");
    btnFiltrar.addEventListener("click", filtrarBusqueda);

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
                        <th></th>
                        <th>Cantidad</th>
                        <th></th>
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
                    <img src="${producto.img}" id="" class="img-fluid" alt="">
                    <td>${producto.nombre}</td>
                   <td><button id="eliminar${producto.id}"class="btn btn-info btn-sm"> - </button></td> 
                    <td>${producto.cantidad}</td>
                    <td><button id="agregarLinea${producto.id}"class="btn btn-info btn-sm"> + </button></td>
                    <td>$${producto.precioTotal}</td>
                    <td><button id="vaciarlinea${producto.id}"class="btn btn-danger">Eliminar</button></td>
          `;

        bodyTabla.appendChild(datos);
        let botonAgregarLinea = document.getElementById(
          `agregarLinea${producto.id}`
        );
        botonAgregarLinea.addEventListener("click", () =>
          agregarAlCarrito(producto.id, producto.nombre)
        );

        let botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", () =>
          eliminarDelCarrito(producto.id, producto.nombre)
        );

        let botonEliminarLinea = document.getElementById(
          `vaciarlinea${producto.id}`
        );
        botonEliminarLinea.addEventListener("click", () =>
          eliminarItem(producto.id)
        );
      }

      let accionesCarrito = document.getElementById("acciones-carrito");
      accionesCarrito.innerHTML = `
        <h5>PrecioTotal: $${precioTotal}</h5></br>
        <button id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</button>
      `;
      let vaciarCarrito = document.getElementById(`vaciarCarrito`);
      vaciarCarrito.addEventListener("click", () =>
        eliminarCarrito()
      );
    }

    function eliminarDelCarrito(id, nombre_pro) {
      let producto = carrito.find((producto) => producto.id === id);

      let index = carrito.findIndex((element) => element.id === producto.id);

      if (producto.cantidad > 1) {
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
      } else {
        carrito.splice(index, 1);
      }

      if (carrito.length == 0) {
        eliminarCarrito();
        return;
      }

      Toastify({
        text: `${nombre_pro} se Borro con Exito`,
        className: "info",
        style: {
          background: "linear-gradient(to right, #ff0039, #f1402f)",
        },
      }).showToast();

      localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
      imprimirTabla(carrito);
    }

    function carritoVacio() {
      if (carrito.length == 0) {
        eliminarCarrito();
        return;
      }
    }
    function eliminarItem(id) {      
      const newcart = carrito.filter((item) => item.id != id);      
      carrito = [];
      carrito.push(...newcart);
      imprimirTabla(carrito);
      carritoVacio();
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


carrito = chequearCarritoEnStorage();

  })
  .catch(() => {    
    contenedor.innerHTML = swal.fire(`No encontramos Productos`, "", "error");
    contenedor.innerHTML = "";
  });

