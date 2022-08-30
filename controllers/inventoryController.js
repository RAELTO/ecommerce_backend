const { response, request } = require('express');
const Inventory = require('../models/inventory');
const { Product, Brand, Gender, Type } = require('../models');

const getAllInv = async(req = request, res = response) => {
    const inventory = await Inventory.findAll({attributes: {exclude: ['prod_id', 'prod_brand_id', 'prod_gender_id']},
    include: [{ model: Product, attributes: {exclude: ['type_id']}, include: {model: Type}}, { model: Brand}, { model: Gender}]});
    if (inventory.length > 0) {
        res.json({
            inventory
        });
    }else{
        res.status(404).send('The inventory is empty');
    }
};

const addProduct = async(req = request, res = response) => {
    await Inventory.create({
        prod_id: req.body.prod_id,
        prod_brand_id: req.body.prod_brand_id,
        prod_gender_id: req.body.prod_gender_id,
        prod_stock: req.body.prod_stock,
        description: req.body.description,
        price: req.body.price
    })
        .then(prod => {
            if (prod) {
                res.send({
                    prod,
                    msg: 'Producto agregado correctamente'
                });
                
            } else {
                res.status(400).send('Error while insert new area record');
            }
            
        }).catch(error => {
            console.log(error);
        });
    
};

const updateInv = async(req = request, res = response) => {
    await Inventory.update({ 
        prod_id: req.body.prod_id,
        prod_brand_id: req.body.prod_brand_id,
        prod_gender_id: req.body.prod_gender_id,
        prod_stock: req.body.prod_stock,
        description: req.body.description,
        price: req.body.price
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(prod => {
            if (prod != 0) {
                res.status(200).send(`Producto en inventario con id: ${req.params.id} fue actualizado correctamente`);
            }else{
                res.status(404).send(`Producto en inventario con id: ${req.params.id} no encontrado`);
            }
            
        }).catch(error => {
            console.log(error);
        });
};

const deleteInvProd = async(req = request, res = response) => {
        await Inventory.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(prod => {
                if (prod != 0) {
                    res.status(200).send(`Producto en inventario con id: ${req.params.id} fue borrado correctamente`);
                }else{
                    res.status(404).send(`Producto en inventario con id:: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            })
    
};

module.exports = {
    getAllInv,
    addProduct,
    updateInv,
    deleteInvProd
};