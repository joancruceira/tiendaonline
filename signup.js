
/* recupero el botón con el id "Registrarse", agrego el evento click, recupero los datos de los controles
verifico si hay coincidencia con los datos almacenados en el JSON trayendolos a una matriz, si no existe creo la matriz
creo el objeto nuevo usuario, lo paso a JSON con stringify, recupero la tarjeta del registro para mostrar el mensaje 
registro exitoso con innerHtml, recupero para mostrar el botón de redirección al login, en caso de datos erroneos 
muestro mensaje con else*/

let BtnRegistro = document.getElementById('Registrarse');

BtnRegistro.addEventListener('click', () => {
    let nombre = document.getElementById('Nombre').value;
    let apellido = document.getElementById('Apellido').value;
    let email = document.getElementById('Email').value;
    let fechaNac = document.getElementById('FechaNac').value;
    let password = document.getElementById('Contraseña').value;

    if (nombre && apellido && email && password) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        let nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            fechaNac: fechaNac,
            password: password
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        document.getElementById('tarjeta').innerHTML = `
            <h2>Registro Exitoso</h2>
            <p>¡Gracias por registrarte, ${nombre} ${apellido}!</p>
            <button id="loginBtn">Ir al Login</button>`;

        document.getElementById('loginBtn').addEventListener('click', function() {
            window.location.href = './login.html';
        });

    } else {
        alert('Por favor, completa todos los campos.');
    }
});