const router = require("express").Router();
const { getColors, getColor } = require("../controllers/colors");

router.get("/", async (req, res) => {
    const colors = await getColors();
    res.send(colors);
});

router.get("/:colors", async (req, res) => {
    const colors = req.params.colors;
    const pokemons = await getColor(colors);
    res.send(pokemons);
});

module.exports = router;
