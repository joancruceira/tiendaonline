let carrito=JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(producto){
    let productoExistente=carrito.find(item=>item.id===producto.id);
    if(productoExistente){
        productoExistente.cantidad+=producto.cantidad;
    }
    else{
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

}

function eliminarDelCarrito(idProducto){
    carrito=carrito.filter(producto=> producto.id!==idProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCantidad(idProducto, nuevaCantidad){
    let producto=carrito.find(item=>item.id===idProducto);
    if(producto){
        producto.cantidad=nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

}

function calcularTotal(){
    return carrito.reduce((total, producto)=>total+producto.precio*producto.cantidad, 0);

}

function mostrarCarrito() {
    carrito.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`);
    });
}

function actualizarCantidadCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('carritoCantidad').innerText = cantidadTotal;
}

window.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);