
const { 
    Role, User, Product, Type,
    Inventory, Brand, Gender
} = require('../models');

//------------------ USERS ------------------------------

//Validar si un rol es valido comparando con los disponibles en la DB
const validRoles = async(id = '') => {
    const role_Exists = await Role.findOne({ where: { id: id } });
    if ( !role_Exists ) {
            throw new Error(`El rol con id: ${id} no se encuentra registrado en la DB`);
    }
}

//Validar si un correo ya esta registrado en la DB
const emailValidator = async(email = '') => {
    
    const emailExists = await User.findOne({ where: { email: email } });
    if ( emailExists ){
        throw new Error(`El correo: ${email}, ya se encuentra registrado`);
    }

}

//Validar si un usuario existe en la DB -- validador personalizado
const userExistingId = async(id = '') => {
    
    const userExisting = await User.findByPk(id);
    if ( !userExisting ){
        throw new Error(`No existe un usuario con el id: ${id}`);
    }

}

//-------------- PRODUCTS ----------------------
//Validar si un producto ya esta registrado en la DB
const productValidator = async(product_name = '') => {
    
    const productExists = await Product.findOne({ where: { product_name: product_name } });
    if ( productExists ){
        throw new Error(`The product ${product_name}, is already in the database`);
    }

}

//Validar si un producto existe en la DB -- validador personalizado
const productExistingId = async(id = '') => {
    
    const productExisting = await Product.findByPk(id);
    if ( !productExisting ){
        throw new Error(`Product with id: ${id} doesn't exists`);
    }

}

//Validar si un tipo de producto existe en la DB -- validador personalizado
const typeExistingId = async(id = '') => {
    
    const typeExisting = await Type.findByPk(id);
    if ( !typeExisting ){
        throw new Error(`Type with id: ${id} doesn't exists`);
    }

}

//---------------- INVENTORY --------------------

//
const invPkExist = async(id = '') => {
    
    const invExisting = await Inventory.findByPk(id);
    if ( !invExisting ){
        throw new Error(`Inventory id: ${id} doesn't exists`);
    }

}

//Validar si un producto dentro del inventario existe en la BD
const invExistingId = async(prod_id = '') => {
    
    const invExisting = await Product.findByPk(prod_id);
    if ( !invExisting ){
        throw new Error(`Product with id: ${id} doesn't exists`);
    }

}
//Validar si un producto dentro del inventario existe en la BD
const brandExistingId = async(prod_brand_id = '') => {
    
    const invExisting = await Brand.findByPk(prod_brand_id);
    if ( !invExisting ){
        throw new Error(`Brand with id: ${id} doesn't exists`);
    }

}
//Validar si un producto dentro del inventario existe en la BD
const genderExistingId = async(prod_gender_id = '') => {
    
    const invExisting = await Gender.findByPk(prod_gender_id);
    if ( !invExisting ){
        throw new Error(`Gender with id: ${id} doesn't exists`);
    }

}

//Validar por prod_id si un producto ya esta registrado en inventario
const invValidator = async(prod_id = '') => {
    
    const prodExists = await Inventory.findOne({ where: { prod_id: prod_id } });
    if ( prodExists ){
        const prod = await Product.findByPk(prod_id);
        throw new Error(`El producto: ${prod.product_name} con id: ${prod_id}, ya se encuentra registrado`);
    }

}


module.exports = {
    validRoles,
    emailValidator,
    userExistingId,
    productValidator,
    productExistingId,
    typeExistingId,
    invPkExist,
    invExistingId,
    invValidator,
    brandExistingId,
    genderExistingId

}