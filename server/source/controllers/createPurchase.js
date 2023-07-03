const { Purchase, User } = require("../database");
const Joi = require("joi");

// const createPurchase = async (
//     email, 
//     paymentMethod, 
//     cardNumber, 
//     cardHolderName, 
//     expirationDate, 
//     cvv,
//     name, 
//     street, 
//     number, 
//     zipCode,
//     userId
//     ) => { 

//     const user = await User.findByPk(userId);
//     if (!user) {
//         throw new Error("User doesn't exist");
//     }

//     const purchaseCreated = await Purchase.create({
//                 email,
//                 paymentMethod, 
//                 cardNumber, 
//                 cardHolderName, 
//                 expirationDate, 
//                 cvv, 
//                 name, 
//                 street, 
//                 number, 
//                 zipCode,
//                 userId
//             })

//     return purchaseCreated;
// };

// module.exports = createPurchase;


const createPurchase = async (
    email,
    paymentMethod,
    cardNumber,
    cardHolderName,
    expirationDate,
    cvv,
    name,
    street,
    number,
    zipCode,
    userId
) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        paymentMethod: Joi.string().valid('cash', 'debit', 'credit').required(),
        cardNumber: Joi.number().integer(),
        cardHolderName: Joi.string().regex(/^[a-zA-Z\s]+$/),
        expirationDate: Joi.number(),
        cvv: Joi.number().integer(),
        name: Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
        street: Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
        number: Joi.number().integer().required(),
        zipCode: Joi.number().integer().required(),
        userId: Joi.number().integer()
    });

    const validation = schema.validate({
        email,
        paymentMethod,
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv,
        name,
        street,
        number,
        zipCode,
        userId,
    });

    if (validation.error) {
        throw new Error(validation.error.details[0].message);
    }

    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User doesn't exist");
    };

    const purchaseCreated = await Purchase.create({
        email,
        paymentMethod,
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv,
        name,
        street,
        number,
        zipCode,
        userId,
    });

    return purchaseCreated;
};

module.exports = createPurchase;
