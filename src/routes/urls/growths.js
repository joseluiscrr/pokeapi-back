const router = require("express").Router();
const { getGrowths, getGrowth } = require("../controllers/growths");

router.get("/", async (req, res) => {
    const growths = await getGrowths();
    res.send(growths);
});

router.get("/:growths", async (req, res) => {
    const growths = req.params.growths;
    const pokemons = await getGrowth(growths);
    res.send(pokemons);
});

module.exports = router;
