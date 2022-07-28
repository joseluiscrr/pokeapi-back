const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getGrowths = async () => {
    const growths = await axios.get("https://pokeapi.co/api/v2/growth-rate/");
    const data = growths.data.results.map(r => r.name);
    return data;
};

const getGrowth = async (growths) => {
    const growth = await axios.get("https://pokeapi.co/api/v2/growth-rate/" + growths);
    const names = growth.data.pokemon_species.map(r => r.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getGrowths,
    getGrowth
};
