/*  

    path del end point correspondiente


*/
const { Router } = require( 'express' );
const { check }  = require( 'express-validator' );

//contraladores
const {
    createUser,
    login,
    renewToken} = require( '../controllers/auth' );
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// crear nuevos usuarios
router.post( '/new', [
    check( 'name', 'name is required' ).not().isEmpty(),
    check( 'email', 'email is required' ).isEmail(),
    check( 'password', 'password would 6 digit or more' ).isLength({ min: 6 }),
], validateFields
 ,createUser );

//login de usuarios
router.post( '/', [
    check( 'email', 'name is required' ).isEmail(),
    check( 'password','password is required' ).not().isEmpty(),
    validateFields,
] ,login );

router.get( '/renew', validateJWT ,renewToken );



module.exports = router;