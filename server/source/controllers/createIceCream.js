const { IceCream } = require("../database");
// const fs = require('fs');

const createIceCream = async (name, flavors, description, protein, calories, totalFat, price, imageUrlHome, imageUrl, category) => {
    const iceCreamCreated = await IceCream.create({
        name, 
        flavors, 
        description, 
        protein,
        calories,
        totalFat, 
        price, 
        imageUrlHome,
        imageUrl, 
        category
    });

    return iceCreamCreated;
};

module.exports = createIceCream;