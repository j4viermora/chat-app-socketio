/*

localhost:8080/api/mensajes/:id

*/

const { Router } = require( 'express' );
const getMessages = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router()


router.get( '/:id', validateJWT, getMessages  )




module.exports = router;