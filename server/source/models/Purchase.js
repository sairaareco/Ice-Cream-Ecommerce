const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("Purchase", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        paymentMethod : {
            type: DataTypes.ENUM("cash", "debit", "credit")
        },
        cardHolderName : {
            type: DataTypes.STRING
        },
        cardNumber : {
            type: DataTypes.STRING
        },
        expirationDate: {
            type: DataTypes.STRING
        },
        cvv : {
            type: DataTypes.INTEGER
        },
        name :{
            type: DataTypes.STRING
        },
        street : {
            type: DataTypes.STRING
        },
        number : {
            type: DataTypes.INTEGER
        },
        zipCode : {
            type: DataTypes.INTEGER
        }
    }, { timestamps: false })
};

