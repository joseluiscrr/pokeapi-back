const router = require("express").Router();
const { getPokedexes, getPokedex } = require("../controllers/pokedexes");

router.get("/", async (req, res) => {
    const pokedexes = await getPokedexes()
    res.send(pokedexes);
});

router.get("/:pokedexes", async (req, res) => {
    const pokedexes = req.params.pokedexes;
    const pokemons = await getPokedex(pokedexes);
    res.send(pokemons);
});

module.exports = router;
