const jwt = require( 'jsonwebtoken' );

const validateJWT = ( req, res, next ) => {

    try{

        const token = req.header( 'x-token' );

         if( !token ){
             return res.status(401).json({
                 status: false,
                 msg: 'No hay token en la petición'
             })
         }

         const payload = jwt.verify( token, process.env.JWT_KEY );
         
         req.uid = payload.uid;

        next();

    }catch( errs ){

       return res.status( 401 ).json({
            status: false,
            msg: 'token no valido'
        })

    }


};

module.exports = {
    validateJWT
} 