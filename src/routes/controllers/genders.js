const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getGenders = async () => {
    const genders = await axios.get("https://pokeapi.co/api/v2/gender/");
    const data = genders.data.results.map(r => r.name);
    return data;
};

const getGender = async (genders) => {
    const gender = await axios.get("https://pokeapi.co/api/v2/gender/" + genders);
    const names = gender.data.pokemon_species_details.map(r => r.pokemon_species.name);
    const pokemons = await getPokemonsNames(names);
    return pokemons;
};

module.exports = {
    getGenders,
    getGender
};
