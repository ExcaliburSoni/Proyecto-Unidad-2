document.addEventListener("DOMContentLoaded", function () {

    const diapositivas = document.querySelectorAll(".diapositiva");
    const indicadores = document.querySelectorAll(".indicador");
    let diapositivaActual = 0;
    let temporizadorCarrusel;

    function mostrarDiapositiva(numero) {
        if (diapositivas.length === 0) return;

        diapositivas[diapositivaActual].classList.remove("activa");
        indicadores[diapositivaActual]?.classList.remove("activo");

        diapositivaActual = (numero + diapositivas.length) % diapositivas.length;

        diapositivas[diapositivaActual].classList.add("activa");
        indicadores[diapositivaActual]?.classList.add("activo");
    }

    function iniciarCarrusel() {
        clearInterval(temporizadorCarrusel);

        if (diapositivas.length > 1) {
            temporizadorCarrusel = setInterval(function () {
                mostrarDiapositiva(diapositivaActual + 1);
            }, 5000);
        }
    }

    indicadores.forEach(function (indicador) {
        indicador.addEventListener("click", function () {
            const numero = Number(indicador.dataset.slide);

            if (Number.isInteger(numero) && numero >= 0 && numero < diapositivas.length) {
                mostrarDiapositiva(numero);
                iniciarCarrusel();
            }
        });
    });

    iniciarCarrusel();

    const campoBusqueda = document.querySelector(".busqueda input");
    const botonBusqueda = document.querySelector(".busqueda button");
    const productos = document.querySelectorAll(".catalogo .producto");
    const catalogos = document.querySelectorAll(".catalogo");

    function buscarComics() {
        const texto = campoBusqueda.value.trim().toLocaleLowerCase("es");
        let coincidencias = 0;

        productos.forEach(function (producto) {
            const contenido = producto.textContent.toLocaleLowerCase("es");
            const coincide = contenido.includes(texto);

            producto.hidden = !coincide;

            if (coincide) {
                coincidencias++;
            }
        });

        catalogos.forEach(function (catalogo) {
            const productosVisibles = catalogo.querySelectorAll(".producto:not([hidden])");
            catalogo.hidden = productosVisibles.length === 0;
        });

        let mensaje = document.getElementById("mensaje-busqueda");

        if (!mensaje) {
            mensaje = document.createElement("p");
            mensaje.id = "mensaje-busqueda";
            mensaje.className = "mensaje-busqueda";
            mensaje.setAttribute("role", "status");
            campoBusqueda.closest(".busqueda").insertAdjacentElement("afterend", mensaje);
        }

        if (texto === "") {
            mensaje.textContent = "";
            mensaje.hidden = true;
        } else if (coincidencias === 0) {
            mensaje.textContent = "No encontramos cómics que coincidan con tu búsqueda.";
            mensaje.hidden = false;
        } else {
            mensaje.textContent = "Cómics encontrados: " + coincidencias;
            mensaje.hidden = false;
        }
    }

    if (campoBusqueda && botonBusqueda) {
        botonBusqueda.addEventListener("click", buscarComics);

        campoBusqueda.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") {
                evento.preventDefault();
                buscarComics();
            }
        });

        campoBusqueda.addEventListener("input", buscarComics);
    }

    const botonesProducto = document.querySelectorAll(".boton-producto");

    botonesProducto.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const producto = boton.closest(".producto");
            const nombre = producto.querySelector("h3")?.textContent.trim() || "Cómic";
            const precio = producto.querySelector(".precio")?.textContent.trim() || "Precio no disponible";

            alert(
                "Producto seleccionado:\n" +
                nombre +
                "\nPrecio: " +
                precio
            );
        });
    });

});