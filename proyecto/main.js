const poke_container = document.getElementById(`poke_container`);
const pokemons_number = 151;

const fetchPokemons = async () => {
  for (let i = 1; i < pokemons_number; i++) {
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/` + id.toString();
  console.log(url);

  const answer = await fetch(url);
  const pokemon = await answer.json();
  createPokemonCard(pokemon);
};

const createPokemonCard = (pokemon) => {
  const { name, types, sprites, id } = pokemon;
  const type = types[0].type.name;
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokemonElement.classList.add("grow");

  const pokeInnerHtml = `
  <div class='img-container'>
      <img src='${sprites.front_default}' alt='${name}'/>
      </div>
      <div class='info'>
      <span class='number'>${id}</span>
      <h3 class='name'>${name}</h3> 
      <small class='type'>${type}</small>
      
      </div>`;

  pokemonElement.innerHTML = pokeInnerHtml;
  poke_container.appendChild(pokemonElement);
};

fetchPokemons();
