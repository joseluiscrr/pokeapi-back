const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getPokedexes = async () => {
    const pokedexes = await axios.get("https://pokeapi.co/api/v2/pokedex/");
    const data = pokedexes.data.results.map(r => r.name);
    return data;
};

const getPokedex = async (pokedexes) => {
    const pokedex = await axios.get("https://pokeapi.co/api/v2/pokedex/" + pokedexes);
    const names = pokedex.data.pokemon_entries.map(r => r.pokemon_species.name)
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getPokedexes,
    getPokedex
};
