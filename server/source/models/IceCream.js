const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("IceCream", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        flavors : {
            type: DataTypes.STRING,
        },
        description : {
            type:DataTypes.TEXT,
        },
        protein: {
            type: DataTypes.STRING,
        },
        calories: {
            type: DataTypes.STRING,
        },
        totalFat: {
            type: DataTypes.STRING,
        },
        price : {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        imageUrlHome : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category : {
            type: DataTypes.STRING
        }
    }, { timestamps: false })
};

