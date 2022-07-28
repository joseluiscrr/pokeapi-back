const router = require("express").Router();
const { getEggs, getEgg } = require("../controllers/eggs");

router.get("/", async (req, res) => {
    const eggs = await getEggs();
    res.send(eggs);
});

router.get("/:eggs", async (req, res) => {
    const eggs = req.params.eggs;
    const pokemons = await getEgg(eggs);
    res.send(pokemons);
});

module.exports = router;
