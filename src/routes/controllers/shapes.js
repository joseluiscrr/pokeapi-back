const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getShapes = async () => {
    const shapes = await axios.get("https://pokeapi.co/api/v2/pokemon-shape/");
    const data = shapes.data.results.map(r => r.name);
    return data;
};

const getShape = async (shapes) => {
    const shape = await axios.get("https://pokeapi.co/api/v2/pokemon-shape/" + shapes);
    const names = shape.data.pokemon_species.map(r => r.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getShapes,
    getShape
};
