const { Purchase } = require("../database");

const deletePurchase = async (purchaseId) => {
    const purchaseDeleted = await Purchase.destroy({ where: {id: purchaseId}});
    return purchaseDeleted;
};
module.exports = deletePurchase;