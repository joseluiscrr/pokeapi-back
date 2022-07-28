const router = require("express").Router();
const { getHabitats, getHabitat } = require("../controllers/habitats");

router.get("/", async (req, res) => {
    const habitats = await getHabitats();
    res.send(habitats);
});

router.get("/:habitats", async (req, res) => {
    const habitats = req.params.habitats;
    const pokemons = await getHabitat(habitats);
    res.send(pokemons);
});

module.exports = router;
