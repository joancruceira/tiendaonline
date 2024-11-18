export function mostrarNombreUsuario() {
    let NombreUsuario = localStorage.getItem('nombreUsuario');

    if (NombreUsuario) {
        const containerD = document.getElementById('ContainerD');
        containerD.innerHTML = `
            <a href="#" id="userLink" class="user-info">
                <i class="fas fa-user"></i> <span id="nombreUsuario">${NombreUsuario}</span>
            </a>
            <div id="menuDesplegable" class="menu" style="display: none;">
                <ul>
                    <li id="logoutOption">Cerrar sesión</li>
                </ul>
            </div>
        `;

        document.getElementById('userLink').addEventListener('click', function (e) {
            e.preventDefault();
            const menu = document.getElementById('menuDesplegable');
            menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
        });

        document.getElementById('logoutOption').addEventListener('click', function () {
            localStorage.removeItem('nombreUsuario'); 
            localStorage.removeItem('carrito');     
            window.location.href = './login.html';   
        });

        document.addEventListener('click', function (event) {
            const menu = document.getElementById('menuDesplegable');
            const userLink = document.getElementById('userLink');
            if (!userLink.contains(event.target) && !menu.contains(event.target)) {
                menu.style.display = 'none';
            }
        });
    }
}
