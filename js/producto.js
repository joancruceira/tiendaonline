/* Variable global de productos */
let Productos = [];

function obtenerProductosPorCategoria(categoria) {
    if (categoria === 'smartphones') {
        return fetch('Smartphone.json')
            .then(response => response.json())
            .then(data => {
                Productos=data.products;
                console.log(`Productos de la categoría ${categoria} (desde JSON):`, data.products);
                return Productos; // Devolver los productos del JSON
            })
            .catch(error => {
                console.error('Error al obtener los productos desde el archivo JSON:', error);
            });
    } else if (categoria==='electronics') {
        return fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(response => response.json())
            .then(data => {
                Productos=data;
                console.log(`Productos de la categoría ${categoria} (desde API):`, data);
                return Productos;
            })
            .catch(error => {
                console.error('Error al obtener los productos desde la API:', error);
            });
    }
    else if (categoria==='accesorios') {
        return fetch('accesorios.json')
            .then(response => response.json())
            .then(data => {
                Productos=data.products;
                console.log(`Productos de la categoría ${categoria} (desde JSON):`, data.products);
                return Productos; 
            })
            .catch(error => {
                console.error('Error al obtener los productos desde el archivo JSON:', error);
            });
    }
}

function obtenerCategoriaDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    return categoria;
}

function mostrarProductos(productos) {
    let contenedorProductos = document.getElementById('product-list');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}" class="imagen">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
                <div class="cantidad">
                    <button onclick="disminuirCantidad(${producto.id})">-</button>
                    <input type="number" value="1" min="1" id="cantidad-${producto.id}" readonly>
                    <button onclick="aumentarCantidad(${producto.id})">+</button>
                </div>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}

/* Funciones para aumentar y disminuir la cantidad */
function aumentarCantidad(idProducto) {
    let cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
}

function disminuirCantidad(idProducto) {
    let cantidadInput = document.getElementById(`cantidad-${idProducto}`);
    if (parseInt(cantidadInput.value) > 1) {
        cantidadInput.value = parseInt(cantidadInput.value) - 1;
    }
}

/* Al cargar la página, obtener productos de la categoría desde la URL */
document.addEventListener('DOMContentLoaded', function() {
    const categoria = obtenerCategoriaDesdeURL();
    
    if (categoria) {
        obtenerProductosPorCategoria(categoria).then(productos => {
            mostrarProductos(productos);
        });
    } else {
        console.log('No se ha especificado una categoría');
    }
});
