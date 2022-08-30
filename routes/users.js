const { Router } = require('express');
const { check } = require('express-validator');

const {
    valFields, 
    valJWT, 
    adminRole, 
    hasRole,
    validateFileUpload
} = require('../middlewares');

const { validRoles, emailValidator, userExistingId } = require('../helpers/db-validator');

const { getAllUsers,
        getOneUser,
        createNewUser,
        updateOneUser,
        deleteOneUser } = require('../controllers/userControllers');


const router = Router();

router.get('/', getAllUsers);

router.get('/:id' , [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( userExistingId ),
    valFields
], getOneUser);

router.put('/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( userExistingId ),
    check('user_name', 'El nombre es obligatorio').not().isEmpty(),
    check('user_last', 'El apellido es obligatorio').not().isEmpty(),
    check('user_cc', 'La cédula es obligatoria').not().isEmpty(),
    check('cellphone_number', 'El teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo ingresado no es válido').isEmail(),
    check('user_address', 'La dirección es obligatoria').not().isEmpty(),
    check('user_city', 'La ciudad es obligatoria').not().isEmpty(),
    check('role_id').custom( validRoles ),
    valFields
], updateOneUser);

router.post('/', [//arreglo de middlewares express-validator
    check('user_name', 'El nombre es obligatorio').not().isEmpty(),
    check('user_last', 'El apellido es obligatorio').not().isEmpty(),
    check('user_cc', 'La cédula es obligatoria').not().isEmpty(),
    check('cellphone_number', 'El teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo ingresado no es válido').isEmail(),
    check('email').custom( emailValidator ),
    check('user_address', 'La dirección es obligatoria').not().isEmpty(),
    check('user_city', 'La ciudad es obligatoria').not().isEmpty(),
    check('role_id').custom( validRoles ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFileUpload,
    valFields
],createNewUser);

router.delete('/:id', [
    valJWT,//si este da error no ejecutara el resto, por eso este middleware debe ser el primero en ejecutarse
    adminRole,//este middleware obliga a que sea admin
    hasRole(1), //este dice que puede cualquiera de los roles especificados
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( userExistingId ),
    valFields
], deleteOneUser);

module.exports = router;