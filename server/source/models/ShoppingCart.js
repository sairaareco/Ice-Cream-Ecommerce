const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("ShoppingCart", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        iceCreamNames: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        iceCreamQuantities: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        iceCreamPrices: {
            type: DataTypes.ARRAY(DataTypes.FLOAT),
            allowNull: false
        },
        totalPrice : {
            type: DataTypes.FLOAT
        }
    }, { timestamps: false })
};