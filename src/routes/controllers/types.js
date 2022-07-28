const axios = require("axios");
const { Type } = require("../../db");
const { getPokemonsNames } = require("./pokemons");

const getTypes = async () => {
    const types = await axios.get("https://pokeapi.co/api/v2/type/");
    types.data.results.map(r => {
        Type.findOrCreate({
            where: {
                name: r.name
            }
        });
    });
    const data = await Type.findAll();
    return data.map(r => r.name);
};

const getType = async (types) => {
    const data = [];
    const type = await axios.get("https://pokeapi.co/api/v2/type/" + types);
    const names = type.data.pokemon.map(r => r.pokemon.name);
    const pokemons = await getPokemonsNames(names);
    data.push({
        name: type.data.name,
        moves: type.data.moves.map(r => r.name),
        double_damage_from: type.data.damage_relations.double_damage_from.map(r => r.name),
        double_damage_to: type.data.damage_relations.double_damage_to.map(r => r.name),
        half_damage_from: type.data.damage_relations.half_damage_from.map(r => r.name),
        half_damage_to: type.data.damage_relations.half_damage_to.map(r => r.name),
        no_damage_from: type.data.damage_relations.no_damage_from.map(r => r.name),
        no_damage_to: type.data.damage_relations.no_damage_to.map(r => r.name)
    });
    return data.concat({pokemons: pokemons});
};

module.exports = {
    getTypes,
    getType
};
