/* Inicializa un array */
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* Agregar un producto al carrito */
function agregarAlCarrito(idProducto) {
    let productoSeleccionado = Productos.find(producto => producto.id === idProducto);
    let cantidadSeleccionada = parseInt(document.getElementById(`cantidad-${idProducto}`).value);

    if (productoSeleccionado) {
        let productoCarrito = carrito.find(item => item.id === productoSeleccionado.id);

        if (productoCarrito) {
            /* Si el producto ya está en el carrito, aumenta la cantidad*/
            productoCarrito.cantidad += cantidadSeleccionada;
        } else {
            /* Si el producto no está en el carrito, lo agrega */
            carrito.push({
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.title,
                precio: productoSeleccionado.price,
                cantidad: cantidadSeleccionada
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito(); 
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
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let contenedorCarrito = document.getElementById('carritoItems');
    contenedorCarrito.innerHTML = '';

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
    document.getElementById('carritoTotal').innerText = `Total: $${total}`;
}

// Actualizar la cantidad de productos en el ícono del carrito
function actualizarCantidadCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('carritoCantidad').innerText = cantidadTotal;
}

// Abrir el carrito cuando se hace clic en el ícono
document.getElementById('abrirCarrito').addEventListener('click', function () {
    document.getElementById('carritoModal').style.display = "block";
    mostrarCarrito();
});

// Ejecuta la actualización de la cantidad del carrito cuando la página se carga
window.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);
