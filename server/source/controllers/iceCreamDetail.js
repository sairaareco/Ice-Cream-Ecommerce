const { IceCream } = require("../database");

const iceCreamDetail = async ({name}) => {
    const iceCreamDet = await IceCream.findOne({where: {name}})
    return iceCreamDet;
};

module.exports = iceCreamDetail;
