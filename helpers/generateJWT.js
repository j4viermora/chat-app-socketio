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


const comprobarJWT = ( token = '' ) =>  {

    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY )

        return [ true, uid ]
    } catch(err){

        return[ false, null ]

    }

}

module.exports = { 
    generateJWT,
    comprobarJWT
     }