const router = require("express").Router();
const { getPokemons, getPokemon, getPokemonBase } = require("../controllers/pokemons");
const { Pokemon, Type, Abilitie } = require("../../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
    const pokemons = await getPokemons();
    res.send(pokemons);
});

router.get("/:prop", async (req, res) => {
    const prop = req.params.prop;
    let pokemon = [];
    if(prop.length === 36) {
        pokemon = await getPokemonBase(prop);
    } else {
        const pokemonBase = await Pokemon.findAll({ where: {name: {[Op.iLike]: prop}} });
        if(pokemonBase.length > 0) {
            pokemon = await getPokemonBase(pokemonBase[0].id);
        } else {
            pokemon = await getPokemon(prop);
        };
    };
    res.send(pokemon);
});

router.post("/", async (req, res) => {
    const { name, image, height, weight, base_experience, hp, attack, defense, special_attack, special_defense, speed, color, habitat, shape, generation, evolves_to, egg_groups, game_indices, types, abilities } = req.body;
    if(!name) return res.status(422).send("Please enter a name");
    if(!image) return res.status(422).send("Please enter a  image");
    if(!types) return res.status(422).send("Please enter the types");
    const pokemon = await Pokemon.create({ name, image, height, weight, base_experience, hp, attack, defense, special_attack, special_defense, speed, color, habitat, shape, generation, evolves_to, egg_groups, game_indices, types, abilities });
    const type = await Type.findAll({ where: {name: {[Op.in]: types}} });
    const abilitie = await Abilitie.findAll({ where: {name: {[Op.in]: abilities}} });
    pokemon.addType(type);
    pokemon.addAbilitie(abilitie);
    res.send("Pokemon creado, kpo");
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if(id.length !== 36) return res.status(422).send("You can't delete pokemon that are not yours");
    const pokemon = await Pokemon.findAll({ where: {id: id}});
    if(pokemon) {
        Pokemon.destroy({ where: {id: id}});
        res.status(200).send("Your pokemon was deleted");
    } else {
        res.status(200).send("The pokemon does not exist or you have probably already deleted it");
    };
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, image, height, weight, base_experience, hp, attack, defense, special_attack, special_defense, speed, color, habitat, shape, generation, evolves_to, egg_groups, game_indices, moves, types, abilities } = req.body;
    try {
        const pokemon = await Pokemon.findByPk(id);
        if(!pokemon) return res.status(404).send("This pokemon does not exist");
        pokemon.name = name ? name : pokemon.name;
        pokemon.image = image ? image : pokemon.image;
        pokemon.height = height ? height : pokemon.height;
        pokemon.weight = weight ? weight : pokemon.weight;
        pokemon.base_experience = base_experience ? base_experience : pokemon.base_experience;
        pokemon.hp = hp ? hp : pokemon.hp;
        pokemon.attack = attack ? attack : pokemon.attack;
        pokemon.defense = defense ? defense : pokemon.defense;
        pokemon.special_attack = special_attack ? special_attack : pokemon.special_attack;
        pokemon.special_defense = special_defense ? special_defense : pokemon.special_defense;
        pokemon.speed = speed ? speed : pokemon.speed;
        pokemon.color = color ? color : pokemon.color;
        pokemon.habitat = habitat ? habitat : pokemon.habitat;
        pokemon.shape = shape ? shape : pokemon.shape;
        pokemon.generation = generation ? generation : pokemon.generation;
        pokemon.evolves_to = evolves_to ? evolves_to : pokemon.evolves_to;
        pokemon.egg_groups = egg_groups ? egg_groups : pokemon.egg_groups;
        pokemon.game_indices = game_indices ? game_indices : pokemon.game_indices;
        pokemon.moves = moves ? moves : pokemon.moves;
        pokemon.types = types ? types : pokemon.types;
        pokemon.abilities = abilities ? abilities : pokemon.abilities;
        await pokemon.save();
        return res.send("Pokemon updated");
    } catch (error) {
        return res.send({ error: error.message });
    };
});

module.exports = router;
