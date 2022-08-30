
const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../database/config');

const Role = sequelize.define('roles', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

});

  console.log(Role === sequelize.models.Role); // true

module.exports = Role;