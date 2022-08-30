const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const Gender = sequelize.define('prod_genders', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    gender_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(Gender === sequelize.models.Gender); // true

module.exports = Gender;