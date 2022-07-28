const router = require("express").Router();
const { getItems, getItemsAttributes, getItemsCategories, getItemsEffects, getItemsPockets } = require("../controllers/items");

router.get("/", async (req, res) => {
    const items = await getItems();
    res.send(items);
});

router.get("/attributes", async (req, res) => {
    const attributes = await getItemsAttributes();
    res.send(attributes);
});

router.get("/categories", async (req, res) => {
    const categories = await getItemsCategories();
    res.send(categories);
});

router.get("/effects", async (req, res) => {
    const effects = await getItemsEffects();
    res.send(effects);
});

router.get("/pockets", async (req, res) => {
    const pockets = await getItemsPockets();
    res.send(pockets);
});

module.exports = router;
