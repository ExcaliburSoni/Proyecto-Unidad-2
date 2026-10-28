// =========================================
// STORAGE.JS
// Administración del LocalStorage
// =========================================

// ---------- USUARIOS ----------

// Obtener todos los usuarios
function obtenerUsuarios() {

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
        return [];
    }

    return JSON.parse(usuarios);

}

// Guardar usuarios
function guardarUsuarios(listaUsuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(listaUsuarios)
    );

}

// Buscar usuario por correo
function buscarUsuario(correo) {

    let usuarios = obtenerUsuarios();

    return usuarios.find(
        usuario => usuario.correo.toLowerCase() === correo.toLowerCase()
    );

}

// ---------- SESIÓN ----------

// Guardar usuario activo
function guardarSesion(usuario) {

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );

}

// Obtener usuario activo
function obtenerSesion() {

    let usuario = localStorage.getItem("usuarioActivo");

    if (usuario === null) {

        return null;

    }

    return JSON.parse(usuario);

}

// Verificar si hay sesión
function haySesion() {

    return obtenerSesion() !== null;

}

// Cerrar sesión
function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

}

