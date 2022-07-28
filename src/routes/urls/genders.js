const router = require("express").Router();
const { getGenders, getGender } = require("../controllers/genders");

router.get("/", async (req, res) => {
    const genders = await getGenders();
    res.send(genders);
});

router.get("/:genders", async (req, res) => {
    const genders = req.params.genders;
    const pokemons = await getGender(genders);
    res.send(pokemons);
});

module.exports = router;
