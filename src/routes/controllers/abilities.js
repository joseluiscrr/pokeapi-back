const axios = require("axios");
const { Abilitie } = require("../../db");
const { getPokemonsNames } = require("../controllers/pokemons");

const getAbilities = async () => {
    const abilities = await axios.get("https://pokeapi.co/api/v2/ability/?limit=100000&offset=0");
    abilities.data.results.map(r => {
        Abilitie.findOrCreate({
            where: {
                name: r.name
            }
        });
    });
    const data = await Abilitie.findAll();
    return data.map(r => r.name);
};

const getAbility = async (abilities) => {
    const data = [];
    const ability = await axios.get("https://pokeapi.co/api/v2/ability/" + abilities);
    const names = ability.data.pokemon.map(r => r.pokemon.name);
    data.push({
        names: ability.data.name,
        description: ability.data.flavor_text_entries[0].flavor_text.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' '),
        effect_changes: ability.data.effect_changes === [] ? ability.data.effect_changes[0].effect_entries[1].effect.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' ') : "Not found",
        effect_entries: {
            effect: ability.data.effect_entries[1].effect.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' '),
            short_effect: ability.data.effect_entries[1].short_effect.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' ')
        }
    });
    const pokemons = await getPokemonsNames(names);
    return data.concat({pokemons: pokemons});
};

module.exports = {
    getAbilities,
    getAbility
};
