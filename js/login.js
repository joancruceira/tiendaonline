document.getElementById('btnLogin').addEventListener('click', () => {
    let emailInput = document.getElementById('emailLogin').value;
    let passwordInput = document.getElementById('passwordLogin').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Datos ingresados: ', emailInput, passwordInput);
    console.log('Usuarios en localStorage: ', usuarios);
    let usuarioEncontrado = usuarios.find(usuario => usuario.email === emailInput && usuario.password === passwordInput);

    console.log('Usuario encontrado: ', usuarioEncontrado);
    

    if (usuarioEncontrado) {
        alert('Login exitoso');
        localStorage.setItem('nombreUsuario', usuarioEncontrado.nombre);
        window.location.href = './index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
        window.location.href = './login.html';
    }
});