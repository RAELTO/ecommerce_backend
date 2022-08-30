
const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const User = sequelize.define('users', {
    // Model attributes are defined here
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_last: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true if not specified
    },
    user_cc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cellphone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
    }
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); // true

module.exports = User;
