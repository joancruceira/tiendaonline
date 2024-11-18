import { generarNavbar } from './navbar.js';
import { insertarCarritoEnPagina } from './carrito.js';
import { mostrarProductos, obtenerProductosPorCategoria } from './producto.js';
import { mostrarNombreUsuario } from './user.js';

document.addEventListener('DOMContentLoaded', () => {
    generarNavbar();
    insertarCarritoEnPagina();
    mostrarNombreUsuario();
    
    const categoria = new URLSearchParams(window.location.search).get('categoria') || 'random';
    console.log(`Cargando productos para la categoría: ${categoria}`); // Depuración
    obtenerProductosPorCategoria(categoria)
        .then(productos => {
            console.log(`Productos cargados:`, productos); // Confirmar productos cargados
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
