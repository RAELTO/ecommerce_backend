//controlador para login o autenticación
const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/users');

const { genJWT } = require("../helpers/gen-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        
        //Verificar si el email existe
        const user = await User.findOne({ where: { email: email } });
        if(!user){
            return res.status(400).json({
                msg: "Usuario / Contraseña incorrecta - email",
                validLogin: false
            });
        }

        // Verficiar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );//compara la passw del body vs la del usuario, retorna un booleano
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Contraseña incorrecta - password",
                validLogin: false
            });
        }

        // Generar el JWT
        const token = await genJWT( user.id );

        res.json({
            user,
            token,
            validLogin: true
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Consulte con el administrador"
        })
    }

}

module.exports = {
    login
}