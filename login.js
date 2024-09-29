document.getElementById('btnLogin').addEventListener('click', () => {
    let emailInput = document.getElementById('emailLogin').value;
    let passwordInput = document.getElementById('passwordLogin').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Datos ingresados: ', emailInput, passwordInput);
    console.log('Usuarios en localStorage: ', usuarios);
    // Busca al usuario en la lista de usuarios almacenada
    let usuarioEncontrado = usuarios.find(usuario => usuario.email === emailInput && usuario.password === passwordInput);

    console.log('Usuario encontrado: ', usuarioEncontrado);
    

    if (usuarioEncontrado) {
        alert('Login exitoso');
        // Guarda el nombre del usuario en localStorage para utilizarlo en la sesión
        localStorage.setItem('nombreUsuario', usuarioEncontrado.nombre);
        // Redirige a la página principal
        window.location.href = './index.html';
    } else {
        // Mostrar alerta si no coincide email/contraseña
        alert('Usuario o contraseña incorrectos');
        window.location.href = './login.html';
    }
});