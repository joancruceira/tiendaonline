function obtenerProductosElectronica() {
    fetch('https://fakestoreapi.com/products/category/electronics')
        .then(res => res.json())
        .then(productos => {
            mostrarProductos(productos); 
        })
        .catch(error => console.error('Error al obtener productos:', error));
}

function mostrarProductos(productos) {
    let contenedorProductos = document.getElementById('product-list');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}


function agregarAlCarrito(idProducto) {
    let productoSeleccionado = productos.find(producto => producto.id === idProducto);
    if (productoSeleccionado) {
        let productoCarrito = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            cantidad: 1
        };
        agregarAlCarrito(productoCarrito); // Llamada a la función en carrito.js
    }
}

window.addEventListener('DOMContentLoaded', obtenerProductosElectronica);