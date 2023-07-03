const {User} = require("../database");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const createNewUser = async (email, password, shoppingCartId) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).regex(/^(?=.*[0-9])/).required()
    });

    const validation = schema.validate({ email, password });

    if (validation.error) {
        throw new Error(validation.error.details[0].message);
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        existingUser.shoppingCartId = shoppingCartId;
        await existingUser.save();
    } else {
        const safePass = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada");
        createClient = await User.create({ email, password: safePass, shoppingCartId });
    return createClient;
    }
};

module.exports = createNewUser;


// const createNewUser = async (email, password, shoppingCartId) => {
    
//     const existingUser = await User.findOne({ where: { email } });

//     if (existingUser) {
//         existingUser.shoppingCartId = shoppingCartId;
//         await existingUser.save();
//     } else {
//         const safePass = await bcrypt.hash(password, 10);
//         console.log("Contraseña encriptada");
//         createClient = await User.create({ email, password: safePass, shoppingCartId });
//         return createClient;
//     }
// };

// module.exports = createNewUser;


// {
//     "email": "user@example.com",
//     "paymentMethod": "cash",
//     "cardNumber": "1234567890123456",
//     "cardHolderName": "John Doe",
//     "expirationDate": "1224",
//     "cvv": 123,
//     "name": "John Doe",
//     "street": "7687",
//     "number": 123,
//     "zipCode": 12345
//   }


// {
//     "iceCreamNames": ["Sweet Dream", "Oreo Sensation"],
//     "iceCreamQuantities": [2, 1],
//     "iceCreamPrices": [5.0, 4.0],
//     "totalPrice": 14.0
// }