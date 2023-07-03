require("dotenv").config();
const { Sequelize } = require("sequelize");
const { USER, PASSWORD, HOST, DATABASE, PORT } = process.env;
const iceCreamModel = require("./models/IceCream");
const userModel = require("./models/User");
const shoppingCartModel = require("./models/ShoppingCart");
const purchaseModel = require("./models/Purchase");
const reviewModel = require("./models/Review");

const URL = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
const dataBase = new Sequelize(
    URL, { logging: false, native: false }
);

iceCreamModel(dataBase);
userModel(dataBase);
shoppingCartModel(dataBase);
purchaseModel(dataBase);
reviewModel(dataBase)

const { IceCream, User, Purchase, Review, ShoppingCart } = dataBase.models;

// RELACIONES MODELOS
Purchase.belongsToMany(IceCream, {through: "purchase_ice"});
IceCream.belongsToMany(Purchase, {through: "purchase_ice"});

User.hasMany(Purchase, { foreignKey: "userId", sourceKey: "id" })
Purchase.belongsTo(User, { foreignKey: "userId", sourceKey: "id" })

IceCream.hasMany(Review, { foreignKey: "iceCreamId", sourceKey: "id" });
Review.belongsTo(IceCream, { foreignKey: "iceCreamId", targetKey: "id" });

ShoppingCart.hasMany(User, {foreignKey: "shoppingCartId", targetKey: "id"});
User.belongsTo(ShoppingCart, {foreignKey: "shoppingCartId", sourceKey: "id"});

module.exports = {
    dataBase,
    ...dataBase.models
};
