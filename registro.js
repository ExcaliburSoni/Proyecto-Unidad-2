// Obtener el formulario
const formulario = document.getElementById("formRegistro");

// Evento del formulario
formulario.addEventListener("submit", registrar);

function registrar(e) {

    e.preventDefault();

    // Obtener datos
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let correo = document.getElementById("correo").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();
    let confirmar = document.getElementById("confirmar").value.trim();

    // ===========================
    // Validar campos vacíos
    // ===========================
    if (
        nombre === "" ||
        apellidos === "" ||
        correo === "" ||
        password === "" ||
        confirmar === ""
    ) {

        alert("Todos los campos son obligatorios.");
        return;
    }

    // ===========================
    // Validar nombre
    // ===========================
    const expresionNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!expresionNombre.test(nombre)) {

        alert("El nombre solo puede contener letras.");
        return;

    }

    // ===========================
    // Validar apellidos
    // ===========================
    if (!expresionNombre.test(apellidos)) {

        alert("Los apellidos solo pueden contener letras.");
        return;

    }

    // ===========================
    // Validar correo
    // ===========================
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {

        alert("Ingresa un correo electrónico válido.");
        return;

    }

    // ===========================
    // Validar contraseña
    // ===========================
    if (password.length < 6) {

        alert("La contraseña debe tener al menos 6 caracteres.");
        return;

    }

    // ===========================
    // Confirmar contraseña
    // ===========================
    if (password !== confirmar) {

        alert("Las contraseñas no coinciden.");
        return;

    }

    // ===========================
    // Obtener usuarios
    // ===========================
    let usuarios = obtenerUsuarios();

    // ===========================
    // Validar correo repetido
    // ===========================
    let existe = usuarios.find(

        usuario => usuario.correo === correo

    );

    if (existe) {

        alert("Este correo ya está registrado.");
        return;

    }

    // ===========================
    // Crear usuario
    // ===========================
    let nuevoUsuario = {

        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        password: password

    };

    // ===========================
    // Guardar usuario
    // ===========================
    usuarios.push(nuevoUsuario);

    guardarUsuarios(usuarios);

    // ===========================
    // Iniciar sesión automáticamente
    // ===========================
    guardarSesion(nuevoUsuario);

    alert("¡Registro exitoso! Bienvenido " + nombre + ".");

    // ===========================
    // Redireccionar
    // ===========================
    window.location.href = "inicio.html";

}