const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("User", {
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
        password : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });
};