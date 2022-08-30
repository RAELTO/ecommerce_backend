const { response } = require('express');

//middleware para validar el rol de los usuarios
const adminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            
            msg: 'Validar el token primero para verificar rol'

        });
    }


    const { role_id, nombre } = req.user;

    if( role_id !== 1 ){// 1 es el id en la tabla de roles para administrador
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede realizar la accion`
        });
    }

    next();
}

const hasRole = ( ...roles ) =>{//validar si el rol del usuario coincide con los válidos

    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Validar el token primero para verificxar rol'
            });
        }

        if (!roles.includes( req.user.role_id )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }
    
}

module.exports = {
    adminRole,
    hasRole
}
