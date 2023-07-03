const { Review, IceCream } = require("../database");

const createReview = async (iceCreamId, rating) => {

    const iceCream = await IceCream.findByPk(iceCreamId)

    if (!iceCream) {
        throw Error("There's no ice cream to appreciate");
    }
    const addReview = await Review.create({ rating, iceCreamId });

    return addReview;
};

module.exports = createReview;