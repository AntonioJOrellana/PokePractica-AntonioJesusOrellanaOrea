
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


//Ejercicio 2 - Fetch y renderizado de los primeros 151 Pokémon
const listaPokemon = document.getElementById('listaPokemon');
const pokemones151 = []; 
async function cargarPokemones() {
  try {


    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();


    data.results.forEach(async (pokemon) => {
 
      const res = await fetch(pokemon.url);
      const dataPokemon = await res.json();


      const div = document.createElement('div');
      div.classList.add('pokemon');


      const nombre = dataPokemon.name;
      const id = dataPokemon.id.toString().padStart(3, '0'); 
      const imagen = dataPokemon.sprites.other['official-artwork'].front_default;
      const tipos = dataPokemon.types.map(t => t.type.name);


      pokemones151.push({
        id: dataPokemon.id,
        nombre: dataPokemon.name,
        tipos: dataPokemon.types.map(t => t.type.name),
        imagen: dataPokemon.sprites.other['official-artwork'].front_default,
        peso: (dataPokemon.weight / 10).toFixed(1),
       altura: (dataPokemon.height / 10).toFixed(1)
    });


      div.innerHTML = `
        <div class="pokemon-imagen">
          <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="pokemon-info">
          <div class="nombre-contenedor">
            <p class="pokemon-id">#${id}</p>
            <h2 class="pokemon-nombre">${nombre}</h2>
          </div>
          <div class="pokemon-tipos">
            ${tipos.map(tipo => `<p class="tipo ${tipo}">${tipo}</p>`).join('')}
          </div>
        </div>
      `;
      listaPokemon.appendChild(div);
    });


  } catch (error) {
    console.error('Error al cargar los Pokémon:', error);
  }
}
cargarPokemones();
