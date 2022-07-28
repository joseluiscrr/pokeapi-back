const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getGenerations = async () => {
    const generations = await axios.get("https://pokeapi.co/api/v2/generation/");
    const data = generations.data.results.map(r => r.name);
    return data;
};

const getGeneration = async (generations) => {
    const data = [];
    const generation = await axios.get("https://pokeapi.co/api/v2/generation/" + generations);
    const names = generation.data.pokemon_species.map(r => r.name);
    data.push({
        name: generation.data.name,
        region: generation.data.main_region.name,
        versions: generation.data.version_groups.map(r => r.name),
        types: generation.data.types.map(r => r.name),
        core_moves: generation.data.moves.map(r => r.name)
    });
    const pokemons = await getPokemonsNames(names);
    return data.concat({pokemons: pokemons});
};

module.exports = {
    getGenerations,
    getGeneration
};
