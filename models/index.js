const Role = require('./roles');
const Server = require('./server');
const User = require('./users');
const Product = require('./product');
const Type = require('./types');
const Inventory = require('./inventory');
const Brand = require('./brands');
const Gender = require('./genders');

//FK for users
User.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(User, {foreignKey: 'role_id'});

//FK for products
Product.belongsTo(Type, {foreignKey: 'type_id'});
Type.hasMany(Product, {foreignKey: 'type_id'});

//FK for inventory
Inventory.belongsTo(Product, {foreignKey: 'prod_id'});
Product.hasMany(Inventory, {foreignKey: 'prod_id'});
Inventory.belongsTo(Brand, {foreignKey: 'prod_brand_id'});
Brand.hasMany(Inventory, {foreignKey: 'prod_brand_id'});
Inventory.belongsTo(Gender, {foreignKey: 'prod_gender_id'});
Gender.hasMany(Inventory, {foreignKey: 'prod_gender_id'});

module.exports = {//es adecuado que este en orden alfabetico
    Brand,
    Gender,
    Inventory,
    Product,
    Role,
    Server,
    Type,
    User
}
