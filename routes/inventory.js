const { Router } = require('express');
const { check } = require('express-validator');

const {
    valJWT, 
    adminRole, 
    hasRole,
    valFields
} = require('../middlewares');

const { invPkExist, invExistingId, brandExistingId, genderExistingId, invValidator } = require('../helpers/db-validator');

const { getAllInv,
        addProduct,
        updateInv,
        deleteInvProd } = require('../controllers/inventoryController');


const router = Router();

router.get('/', getAllInv);

router.put('/:id', [
    valJWT,
    adminRole,
    hasRole(1),
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( invPkExist ),
    check('prod_id', 'The product id is required').not().isEmpty(),
    check('prod_id', 'Is not a valid product id').isNumeric(),
    check('prod_id').custom( invExistingId ),
    check('prod_brand_id', 'The product id is required').not().isEmpty(),
    check('prod_brand_id', 'Is not a valid product id').isNumeric(),
    check('prod_brand_id').custom( brandExistingId ),
    check('prod_gender_id', 'The product id is required').not().isEmpty(),
    check('prod_gender_id', 'Is not a valid product id').isNumeric(),
    check('prod_gender_id').custom( genderExistingId ),
    check('prod_stock', 'The product stock is required').not().isEmpty(),
    check('prod_stock', 'The stock must be a number').isNumeric(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The product stock is required').not().isEmpty(),
    check('price', 'The stock must be a number').isNumeric(),
    valFields
], updateInv);

router.post('/', [
    valJWT,
    adminRole,
    hasRole(1),
    check('prod_id', 'The product id is required').not().isEmpty(),
    check('prod_id', 'Is not a valid product id').isNumeric(),
    check('prod_id').custom( invExistingId ),
    check('prod_id').custom( invValidator ),
    check('prod_brand_id', 'The product id is required').not().isEmpty(),
    check('prod_brand_id', 'Is not a valid product id').isNumeric(),
    check('prod_brand_id').custom( brandExistingId ),
    check('prod_gender_id', 'The product id is required').not().isEmpty(),
    check('prod_gender_id', 'Is not a valid product id').isNumeric(),
    check('prod_gender_id').custom( genderExistingId ),
    check('prod_stock', 'The product stock is required').not().isEmpty(),
    check('prod_stock', 'The stock must be a number').isNumeric(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The product stock is required').not().isEmpty(),
    check('price', 'The stock must be a number').isNumeric(),
    valFields
], addProduct);

router.delete('/:id', [
    valJWT,
    adminRole,
    hasRole(1),
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( invPkExist ),
    valFields
], deleteInvProd);

module.exports = router;