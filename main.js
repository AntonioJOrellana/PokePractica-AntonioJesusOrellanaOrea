
// Ejercicio 1 - Manipular eventos de los tres botones para cambiar el color del nav


// Seleccionamos los botones y el nav
const nav = document.querySelector("nav");
const btnWater = document.getElementById("water");
const btnFire = document.getElementById("fire");
const btnElectric = document.getElementById("electric");
const btnMostrar = document.getElementById("mostrar");


function cambiarColorAgua() {
  nav.style.backgroundColor = "#5AB1F8"; // Azul tipo agua
}


function cambiarColorFuego() {
  nav.style.backgroundColor = "#F08030"; // Rojo tipo fuego
}


function cambiarColorElectrico() {
  nav.style.backgroundColor = "#F8D030"; // Amarillo tipo eléctrico
}


function cambiarColorMostrar() {
  nav.style.backgroundColor = "#4CAF50"; // Verde tipo planta
}

btnWater.addEventListener("click", cambiarColorAgua);
btnFire.addEventListener("click", cambiarColorFuego);
btnElectric.addEventListener("click", cambiarColorElectrico);
btnMostrar.addEventListener("click", cambiarColorMostrar);


