const jwt = require( 'jsonwebtoken' );

const generateJWT = ( uid ) =>{

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        }

        jwt.sign( payload, process.env.JWT_KEY , {
            expiresIn: '3h'
        }, ( err, token ) => {

            if( err ){
                console.log(err)
                reject('No se genero el token');
            }else{
                resolve( token )
            }

        });
    } );




};

module.exports = { generateJWT }