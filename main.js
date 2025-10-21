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

// Ejercicio 2 - Fetch y renderizado de los primeros 151 Pokémon
const listaPokemon = document.getElementById('listaPokemon');
const pokemones151 = []; 
let pokemonesCargados = false; // para saber si se han cargado

async function cargarPokemones() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();

    for (const pokemon of data.results) {
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
    }

    pokemonesCargados = true; // Ya se han cargado 
  } catch (error) {
    console.error('Error al cargar los Pokémon:', error);
  }
}



// Ejercicio 3 - Buscador de Pokémon con diseño personalizado

// Seleccionamos los elementos del HTML
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');
const contenedorPokemones = document.getElementById('listaPokemon'); 

// Función para buscar un Pokémon entre los 151 cargados
function buscarPokemon() {
  const valor = inputBuscar.value.toLowerCase().trim();

  if (valor === '') {
    resultado.innerHTML = `<p>Por favor, escribe un nombre o ID.</p>`;
    return;
  }

  const encontrado = pokemones151.find(
    (p) => p.nombre.toLowerCase() === valor || p.id.toString() === valor
  );

  if (encontrado) {
    contenedorPokemones.style.display = "none";

    resultado.innerHTML = `
      <div class="pokemon">
        <div class="pokemon-imagen">
          <img src="${encontrado.imagen}" alt="${encontrado.nombre}">
        </div>
        <div class="pokemon-info">
          <div class="nombre-contenedor">
            <p class="pokemon-id">#${encontrado.id.toString().padStart(3, '0')}</p>
            <h2 class="pokemon-nombre">${encontrado.nombre}</h2>
          </div>
          <div class="pokemon-tipos">
            ${encontrado.tipos.map((tipo) => `<p class="tipo ${tipo}">${tipo}</p>`).join('')}
          </div>
          <p>Peso: ${encontrado.peso} kg</p>
          <p>Altura: ${encontrado.altura} m</p>
        </div>
      </div>
    `;
  } else {
    resultado.innerHTML = `<p style="color:red;">Pokémon no encontrado entre los 151 primeros</p>`;
  }
}

async function mostrarTodos() {
  resultado.innerHTML = ""; 
  contenedorPokemones.style.display = "grid"; 
  inputBuscar.value = ""; 

  //solo si aún no se han cargado
  if (!pokemonesCargados) {
    await cargarPokemones();
  }
}

// Eventos del buscador
btnBuscar.addEventListener('click', buscarPokemon);
inputBuscar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') buscarPokemon();
});

// Evento del botón "Mostrar Todos"
btnMostrar.addEventListener('click', mostrarTodos);
