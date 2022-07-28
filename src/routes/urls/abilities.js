const router = require("express").Router();
const { getAbilities, getAbility } = require("../controllers/abilities");

router.get("/", async (req, res) => {
    const abilities = await getAbilities();
    res.send(abilities);
});

router.get("/:abilities", async (req, res) => {
    const abilities = req.params.abilities;
    const pokemons = await getAbility(abilities);
    res.send(pokemons);
});

module.exports = router;
