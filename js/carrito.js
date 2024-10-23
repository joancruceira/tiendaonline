// Inicializa un array para el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* Agregar un producto al carrito */
function agregarAlCarrito(idProducto) {
    let productoSeleccionado = Productos.find(producto => producto.id === idProducto);
    let cantidadSeleccionada = parseInt(document.getElementById(`cantidad-${idProducto}`).value);

    if (productoSeleccionado) {
        let productoCarrito = carrito.find(item => item.id === productoSeleccionado.id);

        if (productoCarrito) {
            // Si el producto ya está en el carrito, aumenta la cantidad
            productoCarrito.cantidad += cantidadSeleccionada;
        } else {
            // Si el producto no está en el carrito, lo agrega
            carrito.push({
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.title,
                precio: productoSeleccionado.price,
                cantidad: cantidadSeleccionada
            });
        }

        // Actualizar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarCarrito(); // Muestra el carrito actualizado
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(producto => producto.id !== idProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); 
    actualizarCantidadCarrito(); 
}

// Mostrar el carrito en el modal
function mostrarCarrito() {
    let contenedorCarrito = document.getElementById('carritoItems');
    contenedorCarrito.innerHTML = ''; // Limpiar contenido previo

    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
            <div class="itemCarrito">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio} x ${producto.cantidad}</p>
                <button class="elimina" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </div>
        `;
    });

    let total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.getElementById('carritoTotal').innerText = `Total: $${total.toFixed(2)}`;
}

// Actualizar la cantidad de productos en el ícono del carrito
function actualizarCantidadCarrito() {
    let cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('carritoCantidad').innerText = cantidadTotal;
}

// Abrir el carrito cuando se hace clic en el ícono
document.getElementById('abrirCarrito').addEventListener('click', function () {
    document.getElementById('carritoModal').style.display = "block";
    mostrarCarrito();
});

// Generar el HTML del carrito para insertarlo en la página
function generarCarritoHTML() {
    return `
        <div id="carritoModal" class="modal" style="display: none;">
          <div class="modal-content">
              <span class="cerrar" onclick="document.getElementById('carritoModal').style.display='none'">&times;</span>
              <h2>Tus compras</h2>
              <div id="carritoItems"></div>
              <p id="carritoTotal">Total: $0</p>
              <button id="finalizarCompra">Finalizar Compra</button>
          </div>
        </div>
    `;
}

// Insertar el modal del carrito en la página
function insertarCarritoEnPagina() {
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', generarCarritoHTML());

    // Evento para finalizar compra (puedes definir más acciones aquí)
    document.getElementById('finalizarCompra').addEventListener('click', function() {
        alert('Compra finalizada. Gracias!');
        carrito = []; // Vaciamos el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
        mostrarCarrito(); // Actualizar vista
        actualizarCantidadCarrito(); // Actualizar cantidad en el ícono
        document.getElementById('carritoModal').style.display = "none"; // Cerrar modal
    });
}

// Ejecutar la actualización de la cantidad del carrito cuando la página se carga
window.addEventListener('DOMContentLoaded', () => {
    insertarCarritoEnPagina();
    actualizarCantidadCarrito();
});
