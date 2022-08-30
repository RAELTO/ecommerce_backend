const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const Brand = sequelize.define('prod_brands', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(Brand === sequelize.models.Brand); // true

module.exports = Brand;