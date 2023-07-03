const { IceCream } = require("../database");

const deleteIceCream = async (id) => {
    const removeIceCream = await IceCream.destroy({ where: {id: id}});
    return removeIceCream;
};

module.exports = deleteIceCream;