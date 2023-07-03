const { ShoppingCart } = require("../database");

const createShopCart = async ({ iceCreamNames, iceCreamQuantities, iceCreamPrices, totalPrice }) => { 
    const newShoppingCart = await ShoppingCart.create({
        iceCreamNames,
        iceCreamQuantities,
        iceCreamPrices,
        totalPrice
    });

    return newShoppingCart;
};

module.exports = createShopCart;
