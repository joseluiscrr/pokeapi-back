const router = require("express").Router();
const { getGenerations, getGeneration } = require("../controllers/generations");

router.get("/", async (req, res) => {
    const generations = await getGenerations();
    res.send(generations);
});

router.get("/:generations", async (req, res) => {
    const generations = req.params.generations;
    const pokemons = await getGeneration(generations);
    res.send(pokemons);
});

module.exports = router;
