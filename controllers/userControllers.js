const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Role, User } = require('../models');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const getAllUsers = async(req = request, res = response) => {//obtener todos los cursos
    const users = await User.findAll({attributes: {exclude: ['role_id']}, include: [{ model: Role}]});
    if (users.length > 0) {
        res.json({
            users
        });
    }else{
        res.status(404).send('Users not found');
    }
};

const getOneUser = async(req = request, res = response) => {
    const user = await User.findOne({attributes: {exclude: ['role_id']}, where: { id: req.params.id }, include: [{ model: Role}]});

    if (user) {
        res.json({
            user
        });
    }else{
        res.status(404).send(`User with id: ${req.params.id} was not found`);
    }
    
};

const createNewUser = async(req = request, res = response) => {

    // pass encrypt
    const salt = bcryptjs.genSaltSync();

    await User.create({
        user_name: req.body.user_name,
        user_last: req.body.user_last,
        user_cc: req.body.user_cc,
        email: req.body.email,
        cellphone_number: req.body.cellphone_number,
        user_address: req.body.user_address,
        user_city: req.body.user_city.toUpperCase(),
        role_id: req.body.role_id,
        password: bcryptjs.hashSync( req.body.password.toString(), salt )//encriptacion de una sola via,
    })
        .then(user => {
            if (user) {
                res.status(200).send({
                    user,
                    msg: "Usuario creado correctamente"
                });
            } else {
                res.status(400).send('Error in insert new record');
            }
            
        }).catch(error => {
            console.log(error);
        });

        if (req.files) {
            const users = await User.findAll();
            let model;

            model = await User.findByPk(users[users.length - 1].dataValues.id);

            //Limpiar imagenes previas
            if (model.img) {
                const nombreArr = model.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [ public_id ] = nombre.split('.'); //id publico de cloudinary
                cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
            }

            const { tempFilePath } = req.files.img

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            model.img = secure_url;

            await model.save();
        }
    
};

const updateOneUser = async(req = request, res = response) => {

    if (req.body.password) {
        // pass encrypt
        const salt = bcryptjs.genSaltSync();
        await User.update({
            user_name: req.body.user_name,
            user_last: req.body.user_last,
            user_cc: req.body.user_cc,
            email: req.body.email,
            cellphone_number: req.body.cellphone_number,
            user_address: req.body.user_address,
            user_city: req.body.user_city.toUpperCase(),
            role_id: req.body.role_id,
            password: bcryptjs.hashSync( req.body.password.toString(), salt )//encriptacion de una sola via,
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                if (user != 0) {
                    res.status(200).send(`Usuario con id: ${req.params.id} fue actualizado correctamente`);
                }else{
                    res.status(404).send(`Usuario con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            });

        if (req.files) {
            let model;
            model = await User.findByPk(req.params.id);

            //Limpiar imagenes previas
            if (model.img) {
                const nombreArr = model.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [ public_id ] = nombre.split('.'); //id publico de cloudinary
                cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
            }

            const { tempFilePath } = req.files.img

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            model.img = secure_url;

            await model.save();
        }

    }else{
        await User.update({
            user_name: req.body.user_name,
            user_last: req.body.user_last,
            user_cc: req.body.user_cc,
            email: req.body.email,
            cellphone_number: req.body.cellphone_number,
            user_address: req.body.user_address,
            user_city: req.body.user_city.toUpperCase(),
            role_id: req.body.role_id,
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                if (user != 0) {
                    res.status(200).send(`Usuario con id: ${req.params.id} fue actualizado correctamente`);
                }else{
                    res.status(404).send(`Usuario con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            });

        
        if (req.files) {
            let model;
            model = await User.findByPk(req.params.id);

            //Limpiar imagenes previas
            if (model.img && model.documento) {
                const nombreArr = model.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [ public_id ] = nombre.split('.'); //id publico de cloudinary
                cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id

            }

            const { tempFilePath } = req.files.img
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            model.img = secure_url;

            await model.save();
        }

    }
};

const deleteOneUser = async(req = request, res = response) => {

    //Limpiar imagenes
    let model = await User.findByPk(req.params.id);
    if (model.img) {
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.'); //id publico de cloudinary
        cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
    }

    await User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (user != 0) {
                res.status(200).send(`Usuario con id: ${req.params.id} fue borrado correctamente`);
            }else{
                res.status(404).send(`Usuario con id: ${req.params.id} no encontrado`);
            }
            
        }).catch(error => {
            console.log(error);
        })
    

    
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser
};