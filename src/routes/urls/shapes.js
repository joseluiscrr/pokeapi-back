const router = require("express").Router();
const { getShapes, getShape } = require("../controllers/shapes");

router.get("/", async (req, res) => {
    const shapes = await getShapes();
    res.send(shapes);
});

router.get("/:shapes", async (req, res) => {
    const shapes = req.params.shapes;
    const pokemons = await getShape(shapes);
    res.send(pokemons);
});

module.exports = router;
