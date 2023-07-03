const {ShoppingCart} = require("../database");

const deleteShopCart = async (shoppingCartId) => {
    const shoppingCartDeleted = ShoppingCart.destroy({where:{ id: shoppingCartId }})
    return shoppingCartDeleted;
};

module.exports = deleteShopCart;
