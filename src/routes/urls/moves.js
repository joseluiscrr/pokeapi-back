const router = require("express").Router();
const { getMoves, getMove } = require("../controllers/moves");

router.get("/", async (req, res) => {
    const moves = await getMoves();
    res.send(moves);
});

router.get("/:moves", async (req, res) => {
    const moves = req.params.moves;
    const pokemons = await getMove(moves);
    res.send(pokemons);
});

module.exports = router;
