/* Lógica para mostrar el nombre del usuario logueado, menu para cerrar sesión en la página */
window.addEventListener('DOMContentLoaded', () => {
    let NombreUsuario = localStorage.getItem('nombreUsuario');

    if (NombreUsuario) {
        document.getElementById('ContainerD').innerHTML = `
            <a href="#" id="userLink" class="user-info">
                <i class="fas fa-user"></i> <span id="nombreUsuario">${NombreUsuario}</span>
            </a>
            <div id="menuDesplegable" class="menu" style="display: none;">
                <ul>
                    <li id="logoutOption">Cerrar sesión</li>
                </ul>
            </div>
        `;

        document.getElementById('userLink').addEventListener('click', function(e) {
            e.preventDefault();
            let menu = document.getElementById('menuDesplegable');
            menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
        });

        document.getElementById('logoutOption').addEventListener('click', function() {
            localStorage.removeItem('nombreUsuario');
            localStorage.removeItem('carrito');
            window.location.href = './login.html';
        });

        document.addEventListener('click', function(event) {
            let menu = document.getElementById('menuDesplegable');
            let userLink = document.getElementById('userLink');
            if (!userLink.contains(event.target) && !menu.contains(event.target)) {
                menu.style.display = "none"; 
            }
        });
    }

    // Insertar carrito
    insertarCarritoEnPagina();
});
