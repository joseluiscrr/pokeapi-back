const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getHabitats = async () => {
    const habitats = await axios.get("https://pokeapi.co/api/v2/pokemon-habitat/");
    const data = habitats.data.results.map(r => r.name);
    return data;
};

const getHabitat = async (habitats) => {
    const habitat = await axios.get("https://pokeapi.co/api/v2/pokemon-habitat/" + habitats);
    const names = habitat.data.pokemon_species.map(r => r.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getHabitats,
    getHabitat
};
