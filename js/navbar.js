const paginas = [
    { titulo: "Home", url: "index.html" },
    { titulo: "SmartPhone", url: "categoria1.html?categoria=smartphones" },
    { titulo: "Accesorios", url: "categoria2.html?categoria=accesorios" },
    { titulo: "Tecnología", url: "categoria3.html?categoria=electronics" }
    
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

