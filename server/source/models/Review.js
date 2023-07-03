const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("Review", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rating : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, { timestamps: false })
};