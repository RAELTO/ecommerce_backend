const jwt = require('jsonwebtoken');

const genJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        //función jwt
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, ( err, token ) =>{

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve( token );
            }

        })

    })

}

module.exports = {
    genJWT
}