// Inicializa un array para el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
import { Productos } from './producto.js';

/* Agregar un producto al carrito */
export function agregarAlCarrito(idProducto) {
    const cantidadSeleccionada = parseInt(document.getElementById(`cantidad-${idProducto}`).value); 
    const productoSeleccionado = Productos.find(producto => producto.id === parseInt(idProducto));

    if (productoSeleccionado) {
        let productoCarrito = carrito.find(item => item.id === productoSeleccionado.id);

        if (productoCarrito) {
            productoCarrito.cantidad += cantidadSeleccionada; 
        } else {
            carrito.push({
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.title,
                precio: productoSeleccionado.price,
                cantidad: cantidadSeleccionada, 
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarCarrito();
        const cantidadInput = document.getElementById(`cantidad-${idProducto}`);
        cantidadInput.value = 1;
    }
}

/* Aumentar cantidad mostrada en la tarjeta */
export function aumentarCantidadEnCard(idProducto) {
    const cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    if (cantidadInput) {
        cantidadInput.value = parseInt(cantidadInput.value) + 1;
    }
}

/* Disminuir cantidad mostrada en la tarjeta */
export function disminuirCantidadEnCard(idProducto) {
    const cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    if (cantidadInput && parseInt(cantidadInput.value) > 1) {
        cantidadInput.value = parseInt(cantidadInput.value) - 1; 
    }
}

/* Aumentar cantidad de un producto en el carrito */
export function aumentarCantidadEnCarrito(idProducto) {
    const productoCarrito = carrito.find(producto => producto.id === parseInt(idProducto));
    if (productoCarrito) {
        productoCarrito.cantidad += 1; 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarCarrito(); 
    }
}

/* Disminuir cantidad de un producto en el carrito */
export function disminuirCantidadEnCarrito(idProducto) {
    const productoCarrito = carrito.find(producto => producto.id === parseInt(idProducto));
    if (productoCarrito && productoCarrito.cantidad > 1) {
        productoCarrito.cantidad -= 1; // Decrementa la cantidad en el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarCarrito(); 
    }
}

/* Eliminar producto del carrito */
export function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(producto => producto.id !== parseInt(idProducto));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); 
    actualizarCantidadCarrito(); 
}

/* Mostrar el carrito en el modal */
export function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carritoItems');
    contenedorCarrito.innerHTML = ''; 

    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
            <div class="itemCarrito">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio} x ${producto.cantidad}</p>
                <div class="cantidad">
                    <button class="btn-disminuir" data-id="${producto.id}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-aumentar" data-id="${producto.id}">+</button>
                </div>
                <button class="elimina" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
    });

    const total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.getElementById('carritoTotal').innerText = `Total: $${total.toFixed(2)}`;

    // Asignar eventos dinámicamente a los botones
    document.querySelectorAll('.btn-disminuir').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            disminuirCantidadEnCarrito(id); 
        });
    });

    document.querySelectorAll('.btn-aumentar').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            aumentarCantidadEnCarrito(id); 
        });
    });

    document.querySelectorAll('.elimina').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            eliminarDelCarrito(id); 
        });
    });
}

/* Actualizar la cantidad de productos en el ícono del carrito */
export function actualizarCantidadCarrito() {
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('carritoCantidad').innerText = cantidadTotal;
}

/* Generar el HTML del carrito para insertarlo en la página */
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

/* Insertar el modal del carrito en la página */
export function insertarCarritoEnPagina() {
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', generarCarritoHTML());

    const finalizarCompraButton = document.getElementById('finalizarCompra');

    finalizarCompraButton.replaceWith(finalizarCompraButton.cloneNode(true)); //el evento se disparaba dos veces y en teoría esto lo soluciona (??)
    document.getElementById('finalizarCompra').addEventListener('click', function () {
        if (carrito.length > 0) {
            alert('Compra finalizada. ¡Gracias!');
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
            actualizarCantidadCarrito();
            document.getElementById('carritoModal').style.display = 'none'; 
        } else {
            alert('Para comprar, agregue productos al carrito.');
        }
    });
}

document.getElementById('abrirCarrito').addEventListener('click', function () {
    const modal = document.getElementById('carritoModal');
    if (modal) {
        modal.style.display = 'block';
        mostrarCarrito(); 
    } else {
        console.error('No se encontró el modal del carrito.');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    insertarCarritoEnPagina();
    actualizarCantidadCarrito();
});
