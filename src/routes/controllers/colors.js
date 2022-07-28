const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getColors = async () => {
    const color = await axios.get("https://pokeapi.co/api/v2/pokemon-color/");
    const data = color.data.results.map(r => r.name);
    return data;
};

const getColor = async (colors) => {
    const color = await axios.get("https://pokeapi.co/api/v2/pokemon-color/" + colors);
    const names = color.data.pokemon_species.map(r => r.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getColors,
    getColor
};
