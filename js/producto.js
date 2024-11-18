export let Productos = [];
import { renderCard } from './card.js';
import { aumentarCantidadEnCard, disminuirCantidadEnCard, agregarAlCarrito } from './carrito.js';

export function obtenerProductosPorCategoria(categoria) {
    if (categoria === 'smartphones') {
        return fetch('Smartphone.json')
            .then(response => response.json())
            .then(data => {
                Productos = data.products;
                console.log(`Productos de la categoría ${categoria}:`, data.products);
                return Productos;
            })
            .catch(error => console.error('Error al obtener los productos desde el archivo JSON:', error));
    } else if (categoria === 'electronics') {
        return fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(response => response.json())
            .then(data => {
                Productos = data;
                console.log(`Productos de la categoría ${categoria}:`, data);
                return Productos;
            })
            .catch(error => console.error('Error al obtener los productos desde la API:', error));
    } else if (categoria === 'accesorios') {
        return fetch('accesorios.json')
            .then(response => response.json())
            .then(data => {
                Productos = data.products;
                console.log(`Productos de la categoría ${categoria}:`, data.products);
                return Productos;
            })
            .catch(error => console.error('Error al obtener los productos desde el archivo JSON:', error));
    } else if (categoria === 'random') {
        // Lógica para artículos random
        return Promise.all([
            fetch('accesorios.json').then(response => response.json()).then(data => data.products),
            fetch('Smartphone.json').then(response => response.json()).then(data => data.products),
            fetch('https://fakestoreapi.com/products/category/electronics').then(response => response.json())
        ])
        .then(([productosJSON1, productosJSON2, productosAPI]) => {
            const productosRandom1 = productosJSON1.sort(() => 0.5 - Math.random()).slice(0, 3);
            const productosRandom2 = productosJSON2.sort(() => 0.5 - Math.random()).slice(0, 3);
            const productosRandomAPI = productosAPI.sort(() => 0.5 - Math.random()).slice(0, 2);
            Productos = [...productosRandom1, ...productosRandom2, ...productosRandomAPI];
            console.log('Productos random seleccionados:', Productos);
            return Productos;
        })
        .catch(error => console.error('Error al obtener los artículos random:', error));
    } else {
        return Promise.resolve([]); // Devuelve un array vacío si no hay una categoría válida
    }
}

export function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('product-list');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        contenedorProductos.innerHTML += renderCard(producto);
    });

    asignarEventosDinamicos();
}

function asignarEventosDinamicos() {
    // Botones para aumentar la cantidad
    document.querySelectorAll('.btn-aumentar').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            aumentarCantidadEnCard(parseInt(id)); 
        });
    });

    // Botones para disminuir la cantidad
    document.querySelectorAll('.btn-disminuir').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            disminuirCantidadEnCard(parseInt(id));
        });
    });

    // Botones para agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            agregarAlCarrito(parseInt(id)); 
        });
    });
}
