const axios = require("axios");
const { Pokemon, Type, Abilitie } = require('../../db');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getPokemons = async () => {
    const pokemons = [];
    for (let index = 1; index < 2; index++) {
        const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + index);
        const data = pokemon.data;
        pokemons.push({
            id: data.id,
            name: data.name,
            image: data.sprites.other['home'].front_default,
            types: data.types.map(r => r.type.name)
        });
    };
    pokemons.forEach(r => {
        r.types.forEach(t => {
            Type.findOrCreate({
                where: {
                    name: t
                }
            });
        });
    });
    const pokemonBase = await Pokemon.findAll({
        include: [
            {model: Type, attributes: ['name'], through: { attributes: [] }}, 
            {model: Abilitie, attributes: ['name'], through: { attributes: [] }}
        ] 
    });
    pokemonBase.map(r => pokemons.push({
        id: r.id,
        name: r.name,
        image: r.image,
        types: r.types.map(r => r.name)
    }));
    return pokemons;
};

const getPokemon = async (prop) => {
    let data = [];
    const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + prop);
    data.push({
        name: pokemon.data.name,
        image: pokemon.data.sprites.other['home'].front_default,
        images: {
            front: pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            back: pokemon.data.sprites.versions['generation-v']['black-white'].animated.back_default,
            front_shiny: pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_shiny,
            back_shiny: pokemon.data.sprites.versions['generation-v']['black-white'].animated.back_shiny,
        },
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        base_experience: pokemon.data.base_experience,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        special_attack: pokemon.data.stats[3].base_stat,
        special_defense: pokemon.data.stats[4].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        game_indices: pokemon.data.game_indices.map(r => r.version.name),
        types: pokemon.data.types.map(r => r.type.name),
        abilities: pokemon.data.abilities.map(r => r.ability.name),
        moves: pokemon.data.moves.map(r => r.move.name)
    });

    const specie = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + prop);
    let i = 0;
    let condition = false;
    let text = '';
    while (condition === false) {
        if(specie.data.flavor_text_entries[i].language.name === 'en') {
            text = specie.data.flavor_text_entries[i].flavor_text.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' ');
            condition = true;
        };
        i++;
    };
    data.push({
        description: text,
        color: specie.data.color.name,
        habitat: specie.data.habitat === null ? null : specie.data.habitat.name,
        shape: specie.data.shape.name,
        generation: specie.data.generation.name,
        egg_groups: specie.data.egg_groups.map(r => r.name)
    });

    if(specie.data.evolution_chain === null) {
        data.push({evolves_to: null})
    } else {
        const evolutions = await axios.get(specie.data.evolution_chain.url);
        const one = evolutions.data.chain.species.name;
        const two = evolutions.data.chain.evolves_to.map(r => r.species.name);
        two.unshift(one);
        if(typeof evolutions.data.chain.evolves_to[0] !== 'undefined') {
            if(typeof evolutions.data.chain.evolves_to[0].evolves_to[0] !== 'undefined') {
                if(one !== 'eevee') {
                    const three = evolutions.data.chain.evolves_to[0].evolves_to[0].species.name;
                    two.push(three);
                };
            }
        };
        data.push({evolves_to: await getPokemonsNames(two)});
    };
    return data;
};

const getPokemonBase = async (prop) => {
    const data = await Pokemon.findByPk(prop, {
        include: [
            {model: Type, attributes: ['name'], through: { attributes: [] }}, 
            {model: Abilitie, attributes: ['name'], through: { attributes: [] }}
        ] 
    });
    return {
        id: data.id,
        name: data.name,
        image: data.image,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        hp: data.hp,
        attack: data.attack,
        defense: data.defense,
        special_attack: data.special_attack,
        special_defense: data.special_defense,
        speed: data.speed,
        color: data.color,
        habitat: data.habitat,
        shape: data.shape,
        generation: data.generation,
        evolves_to: data.evolves_to,
        egg_groups: data.egg_groups,
        game_indices: data.game_indices,
        moves: data.moves,
        types: data.types.map(r => r.name),
        abilities: data.abilities.map(r => r.name)
    };
};

const getPokemonsNames = async (names) => {
    const pokemons = [];
    const cloud = ['pyukumuku', 'giratina', 'thundurus', 'wishiwashi', 'meowstic', 'eiscue', 'shinx', 'landorus', 'aegislash', 'pumpkaboo', 'gourgeist', 'lycanroc', 'minior', 'urshifu', 'wormadam', 'shaymin', 'basculin', 'tornadus', 'zygarde', 'basculegion', 'enamorus', 'indeedee', 'toxtricity', 'deoxys', 'darmanitan', 'oricorio', 'meloetta', 'keldeo', 'mimikyu', 'morpeko'];
    let out = [];
    for (let i = 0; i < names.length; i++) {
        !cloud.includes(names[i]) && out.push(names[i])
    }
    for (let index = 0; index < out.length; index++) {
        const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + out[index]);
        const data = pokemon.data;
        pokemons.push({
            id: data.id,
            name: data.name,
            image: data.sprites.other['home'].front_default,
            types: data.types.map(r => r.type.name)
        });
    };
    return pokemons;
};

module.exports = {
    getPokemons,
    getPokemon,
    getPokemonBase,
    getPokemonsNames
};