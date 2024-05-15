// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //
const inputNombre = document.querySelector('input[name="nombre"]');//Guardamos aquí el selector de los dos inputs
const inputPartidas = document.querySelector('input[name="partidas"]');

document.addEventListener('DOMContentLoaded', () => {//El script solo comienza a ejectuarse cuando ha cargado toda la página
    const imagenesJugador = document.querySelectorAll('#jugador img');
    imagenesJugador.forEach((img, index) => {//Iteramos sobre cada imagen 
        img.src = `img/${posibilidades[index]}Jugador.png`;
        img.dataset.option = posibilidades[index];//Guarda la opcion que escoge el jugador
        img.addEventListener('click', () => {//Agrega un evento cada vez que una imagen es clickada
            imagenesJugador.forEach(i => {//iteramos por las imagenes para quitar la clase seleccionado y añadir al noSeleccionado
                i.classList.remove('seleccionado');
                i.classList.add('noSeleccionado');
            });
            img.classList.add('seleccionado');
            img.classList.remove('noSeleccionado');//la imagen clickada gana la clase seleccionado
        });
    });

    const botones = document.querySelectorAll('button'); //guardamos todos los botones en un array.
    const botonJugar = botones[0]; // Asigna al boton jugar la funcion inicarJuego
    botonJugar.addEventListener('click', iniciarJuego);

    const botonYa = botones[1]; // Asigna al boton YA la funcion realizarTirada
    botonYa.addEventListener('click', realizarTirada);

    const botonReset = botones[2]; // Asigna al boton RESET la funcion resetearJuego
    botonReset.addEventListener('click', resetearJuego);
});

function iniciarJuego() {//Inicia el juego con los datos introducidos
    const nombre = inputNombre.value;
    const partidas = parseInt(inputPartidas.value, 10);
    //Comprueba que el valor añadido en nombre sea mayor a 3 caracteres y no comienze con un número, además de si las partidas son mayor que 0.
    if (nombre.length > 3 && isNaN(nombre.charAt(0)) && partidas > 0) {
        document.querySelector('#total').textContent = partidas;
        document.querySelector('#actual').textContent = '0';
        inputNombre.classList.remove('fondoRojo');
        inputPartidas.classList.remove('fondoRojo');
    } else {//Comprueba que el nombre no sea menor o igual a 3 caracteres y el primer caracter no es un 0.
        if (nombre.length <= 3 || !isNaN(nombre.charAt(0))) {
            inputNombre.classList.add('fondoRojo');
        }
        if (partidas <= 0) {
            inputPartidas.classList.add('fondoRojo');
        }
    }
}

function resetearJuego() {
   
    // Reactivar los campos de entrada y ajustar los valores
    
    inputNombre.disabled = false; // Reactiva el campo del nombre del jugador si estaba desactivado
    inputPartidas.disabled = false; // Reactiva el campo de número de partidas
    inputPartidas.value = 0; // Establecer el número de partidas a 0
    
    // Resetear los contadores de partidas en la interfaz
    document.querySelector('#total').textContent = '0';
    document.querySelector('#actual').textContent = '0';

    // Establecer la imagen por defecto de la máquina
    document.querySelector('#maquina img').src = 'img/defecto.png';
    //Muestra el mensaje de Nueva Partida en el historial.
    document.querySelector('#historial').innerHTML += `<li>Nueva Partida</li>`;

}

    



function realizarTirada() {//juega la partida
    const total = parseInt(document.querySelector('#total').textContent);
    const actual = parseInt(document.querySelector('#actual').textContent);
    
    if (actual >= total) {
        console.log('No se pueden jugar más partidas');
        return; // Detener la función si ya se ha alcanzado el número máximo de partidas
    }

    const jugadorSeleccion = obtenerSeleccionJugador();
    const maquinaSeleccion = eleccionMaquina();
    const resultado = determinarGanador(jugadorSeleccion, maquinaSeleccion);
    actualizarInterfaz(resultado, jugadorSeleccion, maquinaSeleccion);
}




function obtenerSeleccionJugador() {//obtiene lo que el jugador a seleccionado
    
    return document.querySelector('.seleccionado').dataset.option;
}

function eleccionMaquina() {//elige aleatoriamente una opción para la maquina.
    const eleccion = posibilidades[Math.floor(Math.random() * posibilidades.length)];
    document.querySelector('#maquina img').src = `img/${eleccion}Ordenador.png`;
    return eleccion;
}

function determinarGanador(jugador, maquina) {//Determina el ganador
    const jugadorIndex = posibilidades.indexOf(jugador);
    const maquinaIndex = posibilidades.indexOf(maquina);

    if (jugadorIndex === maquinaIndex) {
        return 'Empate';
    } else {
        // Calcula el índice del elemento que puede ser vencido por el elemento actual
        let vencidoIndex = jugadorIndex - 1;
        if (jugadorIndex === 0) {  // Si es el primer elemento, puede vencer al último
            vencidoIndex = posibilidades.length - 1;
        }

        if (maquinaIndex === vencidoIndex) {
            return 'Gana Jugador';
        } else {
            return 'Gana Máquina';
        }
    }
}


function actualizarInterfaz(resultado, jugadorSeleccion, maquinaSeleccion) {//Muestra el historial de partidas.
    const actual = document.querySelector('#actual');
    const historial = document.querySelector('#historial');
    actual.textContent = parseInt(actual.textContent) + 1;
    let resultadoTexto = resultado === 'Gana Jugador' ? `Gana ${document.querySelector('input[name="nombre"]').value}` : resultado;
    historial.innerHTML += `<li>${resultadoTexto}: Jugador (${jugadorSeleccion}) vs Máquina (${maquinaSeleccion})</li>`;
}
