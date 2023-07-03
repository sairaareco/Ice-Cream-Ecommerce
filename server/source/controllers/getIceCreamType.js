const { IceCream } = require("../database");

const getIceCreamType = async ({category}) => {
    const iceCreamType = await IceCream.findAll({where: {category}})
    return iceCreamType;
};

module.exports = getIceCreamType;

