const { Router } = require('express');
const pokemons = require("./urls/pokemons");
const types = require("./urls/types");
const abilities = require("./urls/abilities");
const eggs = require("./urls/eggs");
const growths = require("./urls/growths");
const genders = require("./urls/genders");
const colors = require("./urls/colors");
const habitats = require("./urls/habitats");
const shapes = require("./urls/shapes");
const generations = require("./urls/generations");
const pokedexes = require("./urls/pokedexes");
const items = require("./urls/items");
const moves = require("./urls/moves");

const router = Router();

router.use("/pokemons", pokemons);
router.use("/types", types);
router.use("/abilities", abilities);
router.use("/eggs", eggs);
router.use("/growths", growths);
router.use("/genders", genders);
router.use("/colors", colors);
router.use("/habitats", habitats);
router.use("/shapes", shapes);
router.use("/generations", generations);
router.use("/pokedexes", pokedexes);
router.use("/items", items);
router.use("/moves", moves);

module.exports = router;
