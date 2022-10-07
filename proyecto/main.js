const poke_container = document.getElementById(`poke_container`);
const pokemons_number = 151;
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

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
      <span class='number'>#${id.toString().padStart(3, "0")}</span>
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

  let allStats = "";
  for (let index = 0; index < pokemon.stats.length; index++) {
    const element = pokemon.stats[index];
    allStats =
      allStats + `<p>${element.stat.name} </br> ${element.base_stat}</p>`;
  }

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
};

fetchPokemons();
