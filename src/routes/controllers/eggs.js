const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getEggs = async () => {
    const eggs = await axios.get("https://pokeapi.co/api/v2/egg-group/");
    const data = eggs.data.results.map(r => r.name);
    return data;
};

const getEgg = async (eggs) => {
    const egg = await axios.get("https://pokeapi.co/api/v2/egg-group/" + eggs);
    const names = egg.data.pokemon_species.map(r => r.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getEggs,
    getEgg
};
