/* En este js lo que se hace es generar un array con artículos random de las tres categorias para mostrar en el index, 
la función obtenerArticulosRandom hace un fetch sobre las tres listas (dos json y una api), los cargo a una const
productosJSON1, 2 y 3, con una función sort y slice ordeno y tomo productos aleatoriamente, luego se combinan en la 
última constante que es la que va a mostrarse en la página */



async function obtenerArticulosRandom() {
    // Cargar productos desde el primer archivo JSON
    const productosJSON1 = await fetch('accesorios.json')
        .then(response => response.json())
        .then(data => data.products);

    // Cargar productos desde el segundo archivo JSON
    const productosJSON2 = await fetch('Smartphone.json')
        .then(response => response.json())
        .then(data => data.products);

    // Cargar productos desde FakeStoreAPI
    const productosAPI = await fetch('https://fakestoreapi.com/products/category/electronics')
        .then(response => response.json());

    // Seleccionar 2 productos aleatorios de cada fuente
    const productosRandom1 = productosJSON1.sort(() => 0.5 - Math.random()).slice(0, 3);
    const productosRandom2 = productosJSON2.sort(() => 0.5 - Math.random()).slice(0, 3);
    const productosRandomAPI = productosAPI.sort(() => 0.5 - Math.random()).slice(0, 2);

    // Combinar todos los productos seleccionados
    const productosCombinados = [...productosRandom1, ...productosRandom2, ...productosRandomAPI];
    
    // Mostrar productos
    mostrarProductos(productosCombinados);
    Productos=productosCombinados;
    
}

// Función para mostrar los productos
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

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerArticulosRandom);
