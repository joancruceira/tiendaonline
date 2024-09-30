const paginas = [
    { titulo: "Home", url: "index.html" },
    { titulo: "SmartPhone", url: "categoria1.html" },
    { titulo: "Accesorios", url: "categoria2.html" },
    { titulo: "Tecnología", url: "categoria3.html" }
    
];

function generarNavbar() {
    let navbar = document.querySelector('#navbarNav ul');
    navbar.innerHTML = ''; 

    paginas.forEach(pagina => {
        let link = `
            <li class="nav-item">
                <a class="nav-link" href="${pagina.url}">${pagina.titulo}</a>
            </li>`;
        navbar.innerHTML += link;
    });
}

window.addEventListener('DOMContentLoaded', generarNavbar);

