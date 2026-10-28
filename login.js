const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", iniciarSesion);

function iniciarSesion(e) {

    e.preventDefault();

    let correo = document.getElementById("correo").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();

    // Validar campos vacíos
    if (correo === "" || password === "") {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Validar formato del correo
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    // Obtener usuarios guardados
    let usuarios = obtenerUsuarios();

    // Verificar si el correo existe
    let usuario = usuarios.find(u => u.correo.toLowerCase() === correo);

    if (!usuario) {
        alert("El correo no está registrado.");
        return;
    }

    // Verificar contraseña
    if (usuario.password !== password) {
        alert("La contraseña es incorrecta.");
        return;
    }

    // Guardar sesión
    guardarSesion(usuario);

    alert("Bienvenido " + usuario.nombre + ".");

    // Ir a la pantalla principal
    window.location.href = "inicio.html";

}

// Recuperar contraseña
const recuperar = document.getElementById("recuperar");

if (recuperar) {

    recuperar.addEventListener("click", function (e) {

        e.preventDefault();

        let correo = prompt("Ingresa el correo con el que te registraste:");

        if (!correo) return;

        correo = correo.trim().toLowerCase();

        let usuarios = obtenerUsuarios();

        let usuario = usuarios.find(u => u.correo.toLowerCase() === correo);

        if (usuario) {

            alert("Tu contraseña es: " + usuario.password);

        } else {

            alert("No existe ninguna cuenta registrada con ese correo.");

        }

    });

}