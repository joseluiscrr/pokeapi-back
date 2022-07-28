const axios = require("axios");

const getItems = async () => {
    const items = [];
    for (let index = 1; index < 21; index++) {
        const item = await axios.get("https://pokeapi.co/api/v2/item/" + index);
        const data = item.data;
        items.push({
            name: data.name.replace('-', ' '),
            description: data.flavor_text_entries[0].text.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' '),
            image: data.sprites.default,
            attributes: data.attributes.map(r => r.name),
            category: data.category.name,
            cost: data.cost
        });
    };
    return items;
};

const getItemsAttributes = async () => {
    const attributes = [];
    for (let index = 1; index < 9; index++) {
        const attribute = await axios.get("https://pokeapi.co/api/v2/item-attribute/" + index);
        const data = attribute.data;
        attributes.push({
            name: data.name.replace('-', ' '),
            description: data.descriptions[0].description.replace('POKéMON', 'Pokemon').replace(/\n/g, ' ').replace(/\f/g, ' '),
            items: data.items.map(r => r.name)
        });
    };
    return attributes;
};

const getItemsCategories = async () => {
    const categories = [];
    for (let index = 1; index < 21; index++) {
        const category = await axios.get("https://pokeapi.co/api/v2/item-category/" + index);
        const data = category.data;
        categories.push({
            name: data.name.replace('-', ' '),
            items: data.items.map(r => r.name.replace('-', ' '))
        });
    };
    return categories;
};

const getItemsEffects = async () => {
    const effects = [];
    for (let index = 1; index < 8; index++) {
        const effect = await axios.get("https://pokeapi.co/api/v2/item-fling-effect/" + index);
        const data = effect.data;
        effects.push({
            name: data.name.replace('-', ' '),
            effect: data.effect_entries[0].effect,
            items: data.items.map(r => r.name.replace('-', ' '))
        });
    };
    return effects;
};

const getItemsPockets = async () => {
    const pockets = [];
    for (let index = 1; index < 9; index++) {
        const pocket = await axios.get("https://pokeapi.co/api/v2/item-pocket/" + index);
        const data = pocket.data;
        pockets.push({
            name: data.name.replace('-', ' '),
            categories: data.categories.map(r => r.name.replace('-', ' '))
        });
    };
    return pockets;
};

module.exports = {
    getItems,
    getItemsAttributes,
    getItemsCategories,
    getItemsEffects,
    getItemsPockets
};
