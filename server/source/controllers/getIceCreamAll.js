const { IceCream } = require("../database");

const getIceCreamAll = async () => {
    const AllIceCream = await IceCream.findAll()
    return AllIceCream;
};

module.exports = getIceCreamAll;
