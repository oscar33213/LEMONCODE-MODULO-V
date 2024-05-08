import "./style.css";

//MOSTRAR LA PUNTUACION

let mostrarPuntuacion: number = 0;
let juegoTerminado: boolean = false;

const sumaPuntos = (puntos: number) => {
  if (isNaN(puntos)) {
    console.error("Error: puntos no es un número");
    return;
  }
  mostrarPuntuacion += puntos;
  if (mostrarPuntuacion > 7.5) {
    terminarJuego();
  }
};

//PEDIR CARTA

const DameCarta = (): number => {
  const carta = Math.floor(Math.random() * 10) + 1;

  if (carta === 9 || carta === 10) {
    return carta + 1;
  }

  const imagenes: string[] = [
    "/sources/1_as-copas.jpg",
    "/sources/2_dos-copas.jpg",
    "/sources/3_tres-copas.jpg",
    "/sources/4_cuatro-copas.jpg",
    "/sources/5_cinco-copas.jpg",
    "/sources/6_seis-copas.jpg",
    "/sources/7_siete-copas.jpg",
    "/sources/10_sota-copas.jpg",
    "/sources/11_caballo-copas.jpg",
    "/sources/12_rey-copas.jpg",
  ];

  return carta;
};

const obtenerCarta = () => {
  if (juegoTerminado) {
    console.log("El juego ha terminado, no puedes pedir más cartas.");
    return;
  }

  const carta = DameCarta();
  console.log("Tu carta es: " + carta);
  sumaPuntos(carta); // Suma los puntos de la carta a la puntuación

  // Mostrar la carta
  const contenedorImagenes = document.getElementById(
    "imagenes"
  ) as HTMLDivElement;

  if (contenedorImagenes && carta <= imagenes.length) {
    const imagen = document.createElement("img");
    imagen.src = imagenes[carta - 1];
    imagen.classList.add("imagen");
    contenedorImagenes.appendChild(imagen);
  }
};

const botonCarta = document.getElementById("pedirCarta");

if (botonCarta) {
  botonCarta.addEventListener("click", obtenerCarta);
}

//PLANTARSE

const plantarse = () => {
  terminarJuego();
};

const botonPlantarse = document.getElementById("plantarse");

if (botonPlantarse) {
  botonPlantarse.addEventListener("click", plantarse);
}

//TERMINAR JUEGO

const terminarJuego = () => {
  juegoTerminado = true;
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion) {
    divPuntuacion.innerHTML = "Puntuación final: " + mostrarPuntuacion;
  }
  if (mostrarPuntuacion < 4) {
    console.log("Has sido muy conservador.");
  } else if (mostrarPuntuacion === 5) {
    console.log("Te ha entrado el canguelo eh?");
  } else if (mostrarPuntuacion === 6 || mostrarPuntuacion === 7) {
    console.log("Casi casi...");
  } else if (mostrarPuntuacion === 7.5) {
    console.log("¡Lo has clavado! ¡Enhorabuena!");
  }
};

//REINICIAR JUEGO

const reiniciarJuego = () => {
  location.reload();
};

const botonReiniciar = document.getElementById("restart");

if (botonReiniciar) {
  botonReiniciar.addEventListener("click", reiniciarJuego);
}
