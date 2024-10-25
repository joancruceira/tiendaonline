/* Variable global de productos */
let Productos = [];

function obtenerProductosPorCategoria(categoria) {
    if (categoria === 'smartphones') { //Verifica si es categoria smartphone
        return fetch('Smartphone.json') //Fetch al JSON, el JSON contiene los datos que se asignaran al array
            .then(response => response.json()) //Primera respuesta
            .then(data => { //Variable temporal con los datos del JSON
                Productos=data.products; //Asigna los datos a la variable global
                console.log(`Productos de la categoría ${categoria} (desde JSON):`, data.products);
                return Productos; // Devolvuelve los productos del JSON
            })
            .catch(error => {
                console.error('Error al obtener los productos desde el archivo JSON:', error);
            });
    } else if (categoria==='electronics') { //verifica si es categoria electronics
        return fetch(`https://fakestoreapi.com/products/category/${categoria}`) //pide el JSON a la api
            .then(response => response.json()) //primera respuesta
            .then(data => { //paso de los datos a variable temporal data
                Productos=data; //asignación a la variable global
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
    const params = new URLSearchParams(window.location.search); //busca el parametro despues del ?
    const categoria = params.get('categoria'); //toma la categoria
    return categoria; //devuelve la categoria
}

function mostrarProductos(productos) {
    let contenedorProductos = document.getElementById('product-list');
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="producto">
    <img src="${producto.image}" alt="${producto.title}" class="imagen">
    <h3>${producto.title}</h3>
    <p class="price">Precio: $${producto.price}</p>
    <p class="description">${producto.description}</p>
    <div class="cantidad">
        <button onclick="disminuirCantidad(${producto.id})">-</button>
        <input type="number" value="1" min="1" id="cantidad-${producto.id}" readonly>
        <button onclick="aumentarCantidad(${producto.id})">+</button>
    </div>
    <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
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
