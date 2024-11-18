export function renderCard(producto) {
    return `
        <div class="producto" id="producto-${producto.id}">
            <img src="${producto.image}" alt="${producto.title}" class="imagen">
            <h3>${producto.title}</h3>
            <p class="price">Precio: $${producto.price}</p>
            <p class="description">${producto.description || ''}</p>
            <div class="cantidad">
                <button class="btn-disminuir" data-id="${producto.id}">-</button>
                <input type="number" value="1" min="1" id="cantidad-${producto.id}" readonly>
                <button class="btn-aumentar" data-id="${producto.id}">+</button>
            </div>
            <button class="add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
        </div>
    `;
}
