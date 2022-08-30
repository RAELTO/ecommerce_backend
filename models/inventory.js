const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const Inventory = sequelize.define('inventory', {
    // Model attributes are defined here
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prod_brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prod_gender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prod_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: 'No Description',
        allowNull: false
    },
    prod_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(Inventory === sequelize.models.Inventory); // true

module.exports = Inventory;