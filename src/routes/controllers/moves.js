const axios = require("axios");
const { getPokemonsNames } = require("./pokemons");

const getMoves = async () => {
    const moves = await axios.get("https://pokeapi.co/api/v2/move?offset=0&limit=10000");
    const data = moves.data.results.map(r => r.name);
    return data;
};

const getMove = async (moves) => {
    const data = [];
    const move = await axios.get("https://pokeapi.co/api/v2/move/" + moves);
    const names = move.data.learned_by_pokemon.map(r => r.name);
    data.push({
        name: move.data.name,
        description: move.data.flavor_text_entries[0].flavor_text.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' '),
        accuracy: move.data.accuracy,
        damage_class: move.data.damage_class.name,
        power: move.data.power,
        pp: move.data.pp,
        priority: move.data.priority,
        type: move.data.type.name,
        effect_entries: {
            effect: move.data.effect_entries[0].effect,
            short_effect: move.data.effect_entries[0].short_effect
        },
    });
    const pokemons = await getPokemonsNames(names);
    return data.concat({pokemons: pokemons});
};

module.exports = {
    getMoves,
    getMove
};
