const router = require("express").Router();
const { getTypes, getType } = require("../controllers/types");

router.get("/", async (req, res) => {
    const types = await getTypes();
    res.send(types);
});

router.get("/:types", async (req, res) => {
    const types = req.params.types;
    const pokemons = await getType(types);
    res.send(pokemons);
});

module.exports = router;
