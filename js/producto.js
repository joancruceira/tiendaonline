/* Variable global de productos */
let Productos=[];

/* Obtengo productos de la api */
function obtenerProductosElectronica() {
    fetch('https://fakestoreapi.com/products/category/electronics')
        .then(res => res.json())
        .then(productos => {
            Productos=productos;
            mostrarProductos(productos); 
        })
        .catch(error => console.error('Error al obtener productos:', error));
}

/* obtengo el div de los productos, recorro el array con un foreach, agrego dinámicamente los productos con innerHTML */
function mostrarProductos(productos) {
    let contenedorProductos = document.getElementById('product-list');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                
                <p>Precio: $${producto.price}</p>
                
                <!-- Controles de cantidad -->
                <div class="cantidad">
                    <button onclick="disminuirCantidad(${producto.id})">-</button>
                    <input type="number" value="1" min="1" id="cantidad-${producto.id}">
                    <button onclick="aumentarCantidad(${producto.id})">+</button>
                </div>
                
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}

/* Función para aumentar cantidad de producto */
function aumentarCantidad(idProducto) {
    let cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
}

/* Función para disminuir cantidad de producto */
function disminuirCantidad(idProducto) {
    let cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    if (parseInt(cantidadInput.value) > 1) {
        cantidadInput.value = parseInt(cantidadInput.value) - 1;
    }
}

/* Este evento hace que obtener productos se ejecute al abrir la página */
window.addEventListener('DOMContentLoaded', obtenerProductosElectronica);