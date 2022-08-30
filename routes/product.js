const { Router } = require('express');
const { check } = require('express-validator');

const {
    valJWT, 
    adminRole, 
    hasRole,
    valFields,
    validateFileUpload
} = require('../middlewares');

const { productExistingId, typeExistingId, productValidator } = require('../helpers/db-validator');

const { getAllProducts,
        getOneProduct,
        createNewProduct,
        updateOneProduct,
        deleteOneProduct } = require('../controllers/productController');


const router = Router();

router.get('/', getAllProducts);

router.get('/:id' , [
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    valFields
], getOneProduct);

router.put('/:id', [
    valJWT,
    adminRole,
    hasRole(1),
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    check('product_name', 'The name is required').not().isEmpty(),
    check('type_id', 'Is not a valid id').isNumeric(),
    check('type_id', 'The type id is required').not().isEmpty(),
    check('type_id').custom( typeExistingId ),
    valFields
], updateOneProduct);

router.post('/', [
    valJWT,
    adminRole,
    hasRole(1),
    check('product_name', 'The name is required').not().isEmpty(),
    check('product_name').custom ( productValidator ),
    check('type_id', 'Is not a valid id').isNumeric(),
    check('type_id', 'The type id is required').not().isEmpty(),
    check('type_id').custom( typeExistingId ),
    validateFileUpload,
    valFields
], createNewProduct);

router.delete('/:id', [
    valJWT,
    adminRole,
    hasRole(1),
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    valFields
], deleteOneProduct);

module.exports = router;