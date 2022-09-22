const poke_container = document.getElementById(`poke_container`);
const pokemons_number = 151;

const d = document,
  $pokemones = d.getElementById("pokemones"),
  $template = d.getElementById("pokemon-template").content,
  $fragment = d.createDocumentFragment();

const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  overlay.classList.toggle("overlay-hidden");
});

const input = document.getElementById("buscador");

input.addEventListener("change", async (e) => {
  let query = e.target.value.toLowerCase();

  if (query.trim().length === 0) {
    cleanPokemons();
    return fetchPokemons();
  }

  const api = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const res = await fetch(api);
  const json = await res.json();

  cleanPokemons();
  createPokemonCard(json);
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokemons_number; i++) {
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const answer = await fetch(url);
  const pokemon = await answer.json();
  createPokemonCard(pokemon);
};

const createPokemonCard = (pokemon) => {
  const { name, types, sprites, id, stats } = pokemon;
  const type = types[0].type.name;
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokemonElement.classList.add("grow");
  const pokeInnerHtml = `
  <div class='img-container poke-card' onclick="findPokemon(${name})" id='${name}'>
      <img src='${sprites.front_default}' alt='${name}'/>
    
      </div>
      <div class='info'>
      <span class='number'>${id}</span>
      <h3 class='name'>${name}</h3> 
      <small class='${type}'>${type}</small>
      
      </div>`;

  pokemonElement.innerHTML = pokeInnerHtml;
  poke_container.appendChild(pokemonElement);
};

const cleanPokemons = () => {
  poke_container.innerHTML = "";
};

const findPokemon = async (card) => {
  console.log(card);
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.classList.toggle("overlay-hidden");
  const url = `https://pokeapi.co/api/v2/pokemon/${card.id}`;
  const answer = await fetch(url);
  const pokemon = await answer.json();

  //realize este ciclo para resumir todas las stats de los pokemones
  let allStats = "";
  for (let index = 0; index < pokemon.stats.length; index++) {
    const element = pokemon.stats[index];
    allStats =
      allStats + `<p>${element.stat.name} </br> ${element.base_stat}</p>`;
  }

  //dentro del inner inclui el ciclo para ahorrarme lineas de codigo, ademas de usar la funcion ternaria vista ayer, ya que sin ella el codiigo me daba error
  modal.innerHTML = `
    <div class="pokeImagen">
      <img src='${pokemon.sprites.front_default}' alt='${name}'/>
    </div>
    <div class="basicInfo">
      <p>${pokemon.name}</p>
      <p>${pokemon.id}</p>
      </div>
      <div class='caract'>
     ${allStats}
     </div>
     </div>
     <div class="twoTypes">
      <p class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name} 
   </p> 
      <p class="${pokemon.types[1] ? pokemon.types[1]?.type?.name : ""} ">${
    pokemon.types[1] ? pokemon.types[1]?.type?.name : ""
  }  </p>
    </div>`;

  /*  anteriormente habia usado este codigo para colocar las stats de cada pokemon en su respectiva carta
    
    
    modal.innerHTML = `
    <div class="cardSize">
      <img src='${pokemon.sprites.front_default}' alt='${name}'/> 
    </div>
      
    <div class='info'>
    <p>${pokemon.name}</p>
    <p>${pokemon.id}</p>
    <p>${pokemon.stats[0].stat.name}; ${pokemon.stats[0].base_stat}</p>
    <p>${pokemon.stats[1].stat.name}; ${pokemon.stats[1].base_stat}</p>
    <p>${pokemon.stats[2].stat.name}; ${pokemon.stats[2].base_stat}</p>
    <p>${pokemon.stats[3].stat.name}; ${pokemon.stats[3].base_stat}</p>
    <p>${pokemon.stats[4].stat.name}; ${pokemon.stats[4].base_stat}</p>
    <p>${pokemon.stats[5].stat.name}; ${pokemon.stats[5].base_stat}</p>
    <p>${pokemon.types[0].type.name} ; ${pokemon.types[1]?.type?.name}    </p> */
};

fetchPokemons();
