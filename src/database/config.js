const { connect } = require( 'mongoose' );

const dbConnection = async () =>{

    try{
    
       await connect( process.env.DB_CONNECT, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
       } );
       console.log('DB online')
    
    
    }catch( errs ){
    
        console.log(errs);
        throw new Error( 'Error en la base de datos  -vea logs' );
    
    };

}



module.exports = {
    dbConnection
};